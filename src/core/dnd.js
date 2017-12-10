/**
 *  drag and drop based on html5
 */

import store from '../store/index'
import {
  deepCopy
} from '../util/assist'
import {
  generateUid,
  findSoulByCid,
  findSoulByCTypeUp,
  walkSoul
} from '../helper/soul_helper'
import {
  drop
} from './assemble'
import {
  resetSoul
} from '../core/lifecycle'

//把当前拖动的组件存入state下的dragElement中
function onDragStart(e) {
  store.commit('dragModule/setDragElement', e.target)
  return true;
}

function onDrag(e) {
  console.log(e)
  return true
}

//源对象释放鼠标时触发，清空所拖对象(state下的dragElement)
function onDragEnd(e) {
  e.preventDefault();
  store.commit('dragModule/setDragElement', null)
  return true
}

//
function onDragEnter(e) {
  e.preventDefault()
  e.stopPropagation()
  return true
}

//给目标对象dropPanel添加类名drop
function onDragOver(e) {
  e.preventDefault()
  e.stopPropagation()

  const drag = store.getters['dragModule/dragElement'];

  if (validateDrop(drag, this)) {
    markDrop(this, true)
  }

  return true;
}

function onDragLeave(e) {
  e.preventDefault()
  e.stopPropagation()
  markDrop(this, false)
  return true;
}

//drag-源对象 drop-目标对象
function validateDrop(drag, drop) {
  if (!drag) {
    return false
  }
  if (drag.controlConfig.allowPlace) {
    //优先处理allow_place: FormItem只能放在Form里面
    return contains(drag.controlConfig.allowPlace,drop.controlConfig.cid);

  } else {

    if (!drop || !drop.controlConfig.allow) {
      return false

    } else if (drop.controlConfig.allow && drop.controlConfig.allow.length === 0) {
      return true

    } else if (contains(drop.controlConfig.allow,drag.controlConfig.cid)) {
      return true
    }
  }
}

function contains(allow, cid) {
  for(let i =0;i<allow.length;i++){
    allow[i] = allow[i].trim()
    if(allow[i] == cid) return true
  }
}

//给拖动的组件添加drop类名
function markDrop(drop, mark) {
  if (mark) {
    if (!drop.classList.contains('drop')) {
      drop.classList.add('drop')
    }
  } else {
    drop.classList.remove('drop')
  }
}

//
function interceptDrop(saveInfo) {
  if (saveInfo.drag.type === 'WrapCard') {
    let dropPanelSoul = findSoulByCid(100, store.getters['dragModule/draggableControls'])

    let copy = deepCopy(dropPanelSoul)
    copy.slotName = 'title'
    copy.uid = generateUid()
    saveInfo.drag.children.push(copy)
    copy = deepCopy(dropPanelSoul)
    copy.slotName = 'extra'

    copy.uid = generateUid()
    saveInfo.drag.children.push(copy)
    copy = deepCopy(dropPanelSoul)
    copy.slotName = 'default'
    copy.uid = generateUid()
    saveInfo.drag.children.push(copy)
  }
  //soul和saveInfo.drag是等价的
  walkSoul(saveInfo.drag,(soul)=>{
    resetSoul(soul)
  })
}

//
function onDrop(e) {
  e.stopPropagation();
  e.preventDefault();

  //等价于store.state.dragElement
  const drag = store.getters['dragModule/dragElement'];

  if (!validateDrop(drag, this)) {
    return false;
  }

  let uid = generateUid()
  //drag.controlConfig就是当前拖拽的组件
  let copy = deepCopy(drag.controlConfig)
  copy.uid = uid

  const saveInfo = {
    drag: copy,
    drop: this.controlConfig //this.controlConfig指dropPanel(目标对象)
  }
  //saveInfo.drop.uid永远为1
  saveInfo.drag.pid = saveInfo.drop.uid

  interceptDrop(saveInfo)

  drop(saveInfo)

  //false->给拖动的组件添加drop类名之后，再删除drop类
  markDrop(this, false)
  return true;
}

function initDropEvents(drag) {
  drag.ondragenter = onDragEnter //源对象刚进入目标范围内触发此函数
  drag.ondragover = onDragOver //在目标范围内拖动就一直触发
  drag.ondrop = onDrop //在拖动过程中释放鼠标时触发此事件
  drag.ondragleave = onDragLeave //源对象离开目标范围内时触发此事件
}

export {
  onDragStart,
  onDrag,
  onDragEnd,
  onDragEnter,
  onDragOver,
  onDrop,
  onDragLeave,
  initDropEvents,
  interceptDrop
}

//onDragStart,onDrag,onDragEnd--源对象(被拖拽对象)可绑定此3个事件
//onDragEnter,onDragOver,onDrop,onDragLeave--目标对象(释放区域)可绑定此4个事件
//datePicker.render
// (function () { 
//  return function(createElement) {
//     const context = this
//     const store = createElement.store

//     if (!context.initScript) {
//         context.initScript = true
//     }

//     return createElement(context.type, {

//         style: context.model.style.value,
//         props: {
//             type: context.model.type.value,
//             format: context.model.format.value
//         },
//         domProps: {
//             controlConfig: this
//         },
//         nativeOn: {
//             click: function(e) {
//                 store.commit('dragModule/showEditorPanel', e)
//             }
//         },
//         directives: [{
//             name: 'editable',
//             value: 'DatePicker'
//         }]
//     })
// }})()
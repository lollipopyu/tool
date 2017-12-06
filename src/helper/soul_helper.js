import store from '@/store/index'

let uid = 1
const generateUid = (() => uid++)

//这个函数的作用是什么?
function refs(vm, refName) {
  let refs = vm.$refs
  let refsFound = []
  for (let key in refs) {
    if (key.indexOf(refName) > -1 && refs[key]) {
      refsFound.push(refs[key])
    }
  }
  return refsFound
}

// 通过cid过滤返回相应的组件
function findSoulByCid(cid, controls) {
  if (!controls) {
    controls = store.getters['dragModule/draggableControls']
  }
  for (let i = 0; i < controls.length; i++) {
    if (cid == controls[i].cid) {
      return controls[i]
    }
  }
}


//soul if form  获得表单项的参数?
function getFormItemParams(soul) {
  let params = {}
  walkSoul(soul, (soul) => {
    if (soul.isFormItem) {
      params[soul.model.label.value] = soul.model.value.value
    }
  })
  return params
}

//meet every node of syntax tree 编译原理-语法/句法分析?
function walkSoul(soul, fn) {
  fn.call(soul, soul)
  soul.children.forEach(child => {
    walkSoul(child, fn)
  })
}

export {
  generateUid,
  findSoulByCid,
  getFormItemParams,
  walkSoul,
  refs
}
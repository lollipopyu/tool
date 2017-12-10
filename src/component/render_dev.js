//中间区域渲染的源头
import store from '../store/index'
import eventCenter from '../core/event'
import {
  getFormItemParams,
  refs
}  from '../helper/soul_helper'
export default {
  name: 'Render',
  props: {
    soul:[Object]
  },
  render(h){
    if(!this.soul) return

    h.$util = {
      getFormItemParams,
      refs
    }
    h.vm = this
    h.store = store
    h.eventCenter = eventCenter
    eventCenter.createElement = h
    return this.soul.render(h)
  }
}
/**
 * console.log(h);
 * ƒ (a, b, c, d) { return createElement(vm, a, b, c, d, true); }
 *
 * h对象包含如下属性：
 *    $util,
 *    vm,
 *    store,
 *    eventCenter  
 *
 * 这句代码：h.eventCenter = eventCenter
 * h.eventCenter 与 eventCenter引用同一个值
 *
 * 这句代码：eventCenter.createElement = h
 * eventCenter
 *    createElement: h
 *
 * 所以推理出：
 * h.eventCenter
 *    createElement: h
 *
 * 
 * 最后推出：
 * h对象包含如下属性：
 *    $util,
 *    vm,
 *    store,
 *    eventCenter:
 *        createElement: h
 *
 *
 *
 * soul是cid为100时候的DropPanel组件，实则后台返回一条DropPanel数据
 * 打印this.soul.render代码如下
 * (function () { 
     return function(createElement) {
        const context = this
        const store = createElement.store


        if (!context.initScript) {
            context.initScript = true

        }


        return createElement('Div', {
            style: context.model.style.value,
            domProps: {
                controlConfig: this
            },
            directives: [{
                name: 'droppable'
            }],
            'class': {
                'soul-drop-panel': true
            },
            nativeOn: {
                click: function(e) {
                    store.commit('dragModule/showEditorPanel', e)
                }
            },
        }, context.children.map(function(child) {

            return child.render(createElement)
        }))
    }})()
 */

import store from '@/store/index'

let uid = 1
const generateUid = (() => uid++)

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

export {
  generateUid,
  findSoulByCid
}
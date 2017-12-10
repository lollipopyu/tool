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

//soul if form
function getFormItemParams(soul) {
  let params = {}
  walkSoul(soul, (soul) => {
    if (soul.isFormItem) {
      params[soul.model.label.value] = soul.model.value.value
    }
  })
  return params
}

//meet every node of syntax tree
function walkSoul(soul, fn) {
  fn.call(soul, soul)
  soul.children.forEach(child => {
    walkSoul(child, fn)
  })
}

//返回dropPanel中的children数组中的所有源对象
function findSoulByUidDown(uid, soul) {
  if (!soul) {
    soul = store.getters['dragModule/soul']
  }

  if (uid === soul.uid) {
    return soul
  }

  let node;
  for (let i = 0; i < soul.children.length; i++) {
    node = findSoulByUidDown(uid, soul.children[i])
    if (node) {
      return node;
    }
  }
}

export {
  generateUid,
  findSoulByCid,
  findSoulByUidDown,
  walkSoul,
  getFormItemParams,
  refs
}
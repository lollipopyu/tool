function makeIdentify(drag, props) {
  drag.props = props
}

//把父节点赋值给了el
function findElUpward(el) {
  while (!el.controlConfig) {
    el = el.parentNode
  }

  return el
}

function findElUpwardByName(el, name) {
  while (!el.controlConfig || el.controlConfig.name !== name) {
    el = el.parentNode
  }
  return el
}

export {
  findElUpward,
  findElUpwardByName,
  makeIdentify
}

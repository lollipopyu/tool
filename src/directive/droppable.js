/**
 * droppable:可拖拽	
 */
import {
  initDropEvents,
} from '../core/dnd'

export default {
  bind (el, binding, vnode) {
    initDropEvents(el)
  }
};

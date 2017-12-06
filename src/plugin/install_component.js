//这是一个插件，作用：把组件全局化
import {
  RenderDev
} from '../component'

const soul = {
  RenderDev
};

const install = function (Vue, opts = {}) {
  Object.keys(soul).forEach((key) => {
    Vue.component(key, soul[key]);
  });
};

export default Object.assign(soul, {install});

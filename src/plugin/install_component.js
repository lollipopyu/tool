//该插件的作用：把组件全局化
import {
  	Control,
  	ModelEditor,
  	RenderDev,
  	CodeEditor
} from '../component'

const soul = {
	Control,
	ModelEditor,
  	RenderDev,
  	CodeEditor
};

const install = function (Vue, opts = {}) {
  Object.keys(soul).forEach((key) => {
    Vue.component(key, soul[key]);
  });
};

// const install = function (Vue, opts = {}) {
//   ['RenderDev'].forEach((key) => {
//     Vue.component('RenderDev', soul['RenderDev']);
//   });
// };

export default Object.assign(soul, {install});

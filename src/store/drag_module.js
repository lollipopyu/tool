import Vue from 'vue'
import {baseUrl} from '../config/env.js'
import {findSoulByUidDown} from '../helper/soul_helper'
import {findElUpward} from '../helper/dom_helper'

export default {
	namespaced: true,
	state: {
		soul: null, //the view data of current routerPath
		controlClazzes: [],//left side controls in assemble factory
		draggableControls: null, // 左边栏的所有组件
		showCode:false, //是否展示代码
		dragElement: null,//current dragging element
		editSoul: null,
	},
	getters: {
		soul: ({soul}) => soul,
		dragElement: ({dragElement}) => dragElement,
		controlClazzes: ({controlClazzes}) => controlClazzes,
		draggableControls: ({draggableControls}) => draggableControls,
		showCode:({showCode})=>showCode,
		editSoul: ({editSoul}) => editSoul,
	},
	mutations:{
		setDraggableControls(state, draggableControls){
		    state.draggableControls = draggableControls
		},
		setSoul: (state, soul) => {
		    state.soul = soul
		},
		setShowCode:(state,showCode)=>{
		    state.showCode = showCode
		},
		setDragElement(state, element){
		    state.dragElement = element
		},
		setEditLayer(state, bind){
		  let rect = bind.el.getBoundingClientRect();
		  state.editLayer = {
		    style: {
		      left: rect.left + 'px',
		      top: rect.top + 'px',
		      width: rect.width + 'px',
		      height: rect.height + 'px',
		      display: 'block'
		    },
		    name: bind.binding.value + ':' + bind.el.controlConfig.uid
		  }
		},
		//点击每个组件会生成不同的设置控件
		showEditorPanel(state, e){
		  e.stopPropagation()
		  state.rightClickMenu = {
		    style: {
		      display: "none",
		    }
		  }
		  console.log('before',e.target)
		  const el = findElUpward(e.target);
		  console.log('after',el)
		  const soul = findSoulByUidDown(el.controlConfig.uid, state.soul);
		  if (soul && soul.model) {
		    state.editSoul = soul
		    return
		  }
		  state.editSoul = null
		}
	},
	actions: {
	  getControlClazzes({state}){
	    return Vue.axios.post(baseUrl+'classList').then(res => {
		    if (res.data.code === 10000) {
		        state.controlClazzes = res.data.data
		    }
	    }).catch(function(err){
	        console.log(err);
	    });
	  }
	}
}
import Vue from 'vue'
import {baseUrl} from '../config/env.js'
import {findSoulByUidDown} from '../helper/soul_helper'
import {findElUpward} from '../helper/dom_helper'
import {getVueCode} from '../helper/code_helper'
import pretty from 'pretty'

export default {
	namespaced: true,
	state: {
		soul: null, //the view data of current routerPath
		controlClazzes: [],//left side controls in assemble factory
		draggableControls: null, // 左边栏的所有组件
		showCode:false, //是否展示代码
		dragElement: null,//current dragging element
		editSoul: null,
		rightClickMenu: {},//right click menu when right click the dropped element
	},
	getters: {
		soul: ({soul}) => soul,
		dragElement: ({dragElement}) => dragElement,
		controlClazzes: ({controlClazzes}) => controlClazzes,
		draggableControls: ({draggableControls}) => draggableControls,
		showCode:({showCode})=>showCode,
		editSoul: ({editSoul}) => editSoul,
		rightClickMenu: ({rightClickMenu}) => rightClickMenu,
		vueCode: ({soul}) => {
			let data = {},
			//把soul转化成标准的vue代码
			prettyCode = pretty(getVueCode(soul))

			return prettyCode
		}
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
		  const el = findElUpward(e.target);
		  //通过唯一标识符uid找到所点击的组件
		  const soul = findSoulByUidDown(el.controlConfig.uid, state.soul);
		  if (soul && soul.model) {
		    state.editSoul = soul
		    return
		  }
		  state.editSoul = null
		},
		setRightClickMenu(state, el){
		  let e = e || window.event;
		  //x,y of mouse
		  let oX = e.clientX;
		  let oY = e.clientY - 20;
		  //x,y of menu appears
		  state.rightClickMenu = {
		    style: {
		      display: "block",
		      left: oX + "px",
		      top: oY + "px"
		    },
		    uid: el.controlConfig.uid
		  }
		},
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
import Vue from 'vue'
import {baseUrl} from '../config/env.js'

export default {
	namespaced: true,
	state: {
		soul: null, //the view data of current routerPath
		controlClazzes: [],//left side controls in assemble factory
		draggableControls: null, // 左边栏的所有组件
		showCode:false,
	},
	getters: {
		soul: ({soul}) => soul,
		controlClazzes: ({controlClazzes}) => controlClazzes,
		draggableControls: ({draggableControls}) => draggableControls,
		showCode:({showCode})=>showCode,
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
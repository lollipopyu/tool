import Vue from 'vue'
import {baseUrl} from '../config/env.js'

export default {
	namespaced: true,
	state: {
		controlClazzes: [],//left side controls in assemble factory
	},
	getters: {
		controlClazzes: ({controlClazzes}) => controlClazzes,
	},
	actions: {
	  getControlClazzes({state}){
	  	console.log(this.$http)
	    Vue.axios.post(baseUrl+'classList').then(res => {
	      if (res.data.code === 10000) {
	        state.controlClazzes = res.data.data
	      }
	    }).catch(function(err){
	      console.log(err);
	    });
	  }
	}
}
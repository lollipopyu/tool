import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'
import * as actions from './action'
import dragModule from './drag_module'

Vue.use(Vuex)

const state = {
	num: 0,
	visitedViews: []
}

export default new Vuex.Store({
	state,
	actions,
	mutations,
	modules:{
	  dragModule
	}
});
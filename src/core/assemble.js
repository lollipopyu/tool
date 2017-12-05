import store from '@/store/index'
import {
  stringify
}from '../util/assist'
import{
  deepCopy//为了soul和templateStore引用解耦
} from '@/util/assist'
import {
	generateUid,
    findSoulByCid
} from '@/helper/soul_helper'

let templateStore = {
	count: 0,//version number
	dataSnapshot: []//version array
};

// 把DropPanel复制组件保存到了state的soul里面
function init(draggableControls) {
	
	// dropPanelSoul是Unclassified面板下的DropPanel组件
	let dropPanelSoul = findSoulByCid(100, draggableControls),
	
	// 深拷贝了一份dropPanelSoul组件
	copy = deepCopy(dropPanelSoul);//before drop ,must copy drag control
	
	// 该组件有唯一的uid属性
	copy.uid = generateUid() //dropped control has unique uid
	
	store.commit('dragModule/setSoul', copy)
}

// 把soul里面的组件保存到localStorage中
function saveSoul() {

	let data = store.getters['dragModule/soul']
	templateStore.dataSnapshot[templateStore.count] = deepCopy(data)//版本2
	templateStore.count++
	localStorage.setItem("templateStore", stringify(templateStore));
}
export {
  init,
  saveSoul
}
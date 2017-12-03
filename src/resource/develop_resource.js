import mock from "@/mock/data.js"

//获取所有拖拽组件
function getControlList(fn) {
  // this.$http.post('control/controlList').then(res => {
  //   if (res.data.code === 10000) {
  //     this.controls = res.data.data
  //     if(fn){
  //       fn.call(this,res.data.data)
  //     }
  //   }
  // })
	if (mock.code === 10000) {
		this.controls = mock.data;
		if(fn){
			fn.call(this,mock.data); //回调函数fn
		}
	}
}

export {
  getControlList
}
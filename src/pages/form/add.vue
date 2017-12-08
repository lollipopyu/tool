<style lang="scss" scoped>
	.sideBar{
		ul{
			font-size: 0;
		}
		ul li{
			font-size: 12px;
			display: inline-block;
			border-radius: 4px;
			background-color: #dddee1;
			padding: 2px;
			margin: 5px 0 0 5px;
		}
	}
</style>
<template>
	<div class="add-page">
		<el-row>
		  <el-col :span="4" class="sideBar">
		  	<el-collapse>
		  	  <el-collapse-item :key="classIndex" v-for="(controlClass,classIndex) in controlClazzes" :title="controlClass.name" :name="classIndex">
		  	    <!-- <ul>
		  	    	<li v-for="(control,controlIndex) in controlClass.controls">
		  	    		{{control.name}}
		  	    	</li>
		  	    </ul> -->
		  	    <Control
		  	      v-for="(control,controlIndex) in controlClass.controls"
		  	      :controlConfig="control"
		  	      :key="controlIndex">
		  	      <div slot="preview">
		  	        {{control.name}}
		  	      </div>
		  	    </Control>
		  	  </el-collapse-item>
		  	</el-collapse>
		  </el-col>
		  <el-col :span="16">
		  	<RenderDev v-if="!showCode" :soul="soul"></RenderDev>
		  </el-col>
		  <el-col :span="4">
		  </el-col>
		</el-row>
		
	</div>
</template>
<script>
	import {mapGetters, mapMutations, mapActions} from 'vuex'
	import mock from '@/mock/data.js'
	import {getControlList} from  '@/resource/develop_resource'
	import {makeControl} from '@/helper/code_helper'
	import{init, saveSoul}from '@/core/assemble'

	export default{
		data(){
			return{
				items:[],
				titles:[],
				pageSoulId: '',
			}
		},
		async mounted(){
			//实例化数据
			// this.items = [{r:"Row",c:"Col",d:"Card"},{i:"Input",s:"Select",r:"Radio",c:"Checkbox",d:"DatePicker",t:"TimePicker",i:"InputNumber",f:"Form",b:"Button"},{t:"Table",p:"Page"}];
			// this.titles = ["Layout","Form","View"];
			
			// await可以保证getControlClazzes请求执行完再继续执行
			this.pageSoulId = this.$route.query.pageSoulId
			await this.getControlClazzes();
			console.log(1111111111)

			//call的用法
			getControlList.call(this,(data) => {

				let draggableControls = []

				console.log("所有的组件的数据",data);

				// draggableControls是存入重组后的组件数组
				data.forEach(origin => {
				  let control = makeControl(origin.code);

				  console.log("拆分重组后的组件数据",control);

				  control.clazzId = origin.clazzId

				  draggableControls.push(control)
				})

				//classify draggableControls
				//分类，给layout下5个组件，form下11个组件...
				let map = {}
				draggableControls.forEach(item => {
				  if (!map[item.clazzId]) {
				    map[item.clazzId] = []
				  }

				  map[item.clazzId].push(item)
				});
				console.log('map',map);

				/**
				 *controlClazzes这个是获取layout、form标题的数据源,
				 *给controlClazzes数组中的每一个对象添加controls属性
				*/
				let vm = this;
				console.log(111, this.controlClazzes);
				this.controlClazzes.forEach(clazz => {
				  let controls = map[clazz.id]
				   
				  if (controls) {
				  	//给clazz对象添加属性controls
				  	//值是数组(如layout下有5个)
				    // clazz.controls = controls
				    // set可以触发视图
				    vm.$set(clazz, 'controls', controls);
				  }
				})
				
				//store draggableControls
				this.setDraggableControls(draggableControls);

				if (!this.pageSoulId) {
					//when add new page
					init(draggableControls)
					saveSoul()
				}

				this.setShowCode(false)
			});		
		},
		computed: {
			...mapGetters('dragModule', ['controlClazzes','showCode','soul'])
		},
		methods: {
			...mapMutations('dragModule', ['setDraggableControls', 'setShowCode']),
			...mapActions('dragModule', ['getControlClazzes'])
		},

	}
</script>
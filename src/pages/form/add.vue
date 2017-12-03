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
		  <el-col :span="3" class="sideBar">
		  	<el-collapse>
		  	  <el-collapse-item v-for="(title,index) in titles" :title="title" :name="index">
		  	    <ul>
		  	    	<li v-for="item in items[index]">{{item}}</li>
		  	    </ul>
		  	  </el-collapse-item>
		  	</el-collapse>
		  </el-col>
		  <el-col :span="17">
		  </el-col>
		  <el-col :span="4">
		  </el-col>
		</el-row>
		
	</div>
</template>
<script>
	import {mapGetters, mapMutations, mapActions} from 'vuex'
	export default{
		data(){
			return{
				items:[],
				titles:[]
			}
		},
		mounted(){
			//实例化数据
			// this.items = [{r:"Row",c:"Col",d:"Card"},{i:"Input",s:"Select",r:"Radio",c:"Checkbox",d:"DatePicker",t:"TimePicker",i:"InputNumber",f:"Form",b:"Button"},{t:"Table",p:"Page"}];
			// this.titles = ["Layout","Form","View"];
			console.log(1111);
			this.getControlClazzes();
		},
		computed: {
			...mapGetters('dragModule', ['controlClazzes'])
		},
		methods: {
			...mapActions('dragModule', ['getControlClazzes'])
		}
	}
</script>
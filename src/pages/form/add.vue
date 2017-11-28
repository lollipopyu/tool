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
		  	  <el-collapse-item v-for="(title,index) in titles" :title="title" :name="index">
		  	    <ul>
		  	    	<li v-for="item in items">{{item}}</li>
		  	    </ul>
		  	  </el-collapse-item>
		  	</el-collapse>
		  </el-col>
		  <el-col :span="20">
		  </el-col>
		</el-row>
		
	</div>
</template>
<script>
	export default{
		data(){
			return{
				items:[],
				titles:[]
			}
		},
		mounted(){
			//实例化数据
			this.items = ["文本框","日期","输入框","下拉框"];
			this.titles = ["Layout","Form","View"];
		}
	}
</script>
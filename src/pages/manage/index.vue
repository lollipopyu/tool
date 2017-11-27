<template>
	<div class="manage-page fillcontain">
		<el-row style="height: 100%;">
		  	<el-col :span="4" style="height: 100%;">
		    	<el-menu :default-active="defaultActive" style="height: 100%;" theme="dark" router>
		    		<el-menu-item index="manage"><i class="el-icon-menu"></i>首页</el-menu-item>
		    		<el-submenu index="1">
		    		  	<template slot="title">
		    		    	<i class="el-icon-document"></i>
		    		    	<span>表单</span>
		    		  	</template>		  
		    		    <el-menu-item index="form">表单管理</el-menu-item>
		    		</el-submenu>
		    		<el-menu-item index="nav">
		    		  	<i class="el-icon-edit"></i>
		    		  	<span slot="title">导航二</span>
		    		</el-menu-item>
		    		<el-menu-item index="3">
		    		  	<i class="el-icon-setting"></i>
		    		  	<span slot="title">导航三</span>
		    		</el-menu-item>  
		    	</el-menu>
		  	</el-col>
		  	<el-col :span="20" style="height: 100%;overflow: auto;">
		    	<nav-bar></nav-bar>
		    	<keep-alive>
		    		<router-view></router-view>
		    	</keep-alive>
		  	</el-col>
		</el-row>
	</div>
</template>
<script>
	import navBar from './navBar.vue'
	export default{
		components:{
			navBar
		},
		computed: {
			defaultActive: function(){
				return this.$route.path.replace('/', '');
			}
		}
	}
</script>
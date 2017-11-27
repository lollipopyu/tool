<template>
	<div class="c-nav">
		<el-breadcrumb separator-class="el-icon-arrow-right">
		  	<el-breadcrumb-item :to="{ path: '/manage' }">首页</el-breadcrumb-item>
		  	<el-breadcrumb-item v-for="(item,index) in $route.meta.nav" key="index">{{item}}</el-breadcrumb-item>
		</el-breadcrumb>
		<tab-view></tab-view>
	</div>
</template>
<script>
	import tabView from './tabView'
	export default{
		data(){
			return{

			}
		},
		components:{
			tabView
		}
	}
</script>
<style lang="scss">
	.c-nav{
		background-color: #EFF2F7;
		height: 60px;
		display: flex;
		align-items: center;
		padding-left: 20px;
	}
	.el-breadcrumb {
	    font-size: 14px;
	    line-height: 1;
	}
</style>
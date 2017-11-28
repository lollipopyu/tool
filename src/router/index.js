import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const manage = r => require.ensure([], () => r(require('@/pages/manage')), 'manage');
const form = r => require.ensure([], () => r(require('@/pages/form')), 'form');
const nav = r => require.ensure([], () => r(require('@/pages/nav')), 'nav');
const add = r => require.ensure([], () => r(require('@/pages/form/add')), 'add');

export default new Router({
  mode:'history',
  routes: [
  	{
  	  	path: '/', 
        redirect: '/manage'
  	},
    {
      	path: '/manage',
      	component: manage,
      	children:[{
      		path: '/form',
			    component: form,
    			name: '表单管理',
    			meta: {nav:['表单', '表单管理']}, 
        },
      	{
      		path: '/nav',
    			component: nav,
    			name: '导航',
          meta:{nav:['导航二']},
        },
        {
          path: '/add',
          component: add,
        }]
    }
  ]
})

import {createRouter, createWebHistory} from "vue-router";

const routes = [
	{
		path: '/',
		component: () => import('../pages/Main.vue'),
		children: [{
			path: '/',
			component: () => import('../pages/mainframe/Home.vue'),
			alias: ['/main', '/index'],
			meta: {
				title: '主页 - TogaStock股票交易系统'
			}
		}, {
			path: '/stock',
			component: () => import('../pages/mainframe/Stock.vue'),
			meta: {
				title: '股票信息 - TogaStock股票交易系统'
			}
		}, {
			path: '/company',
			component: () => import('../pages/mainframe/Stock.vue'),
			meta: {
				title: '公司信息 - TogaStock股票交易系统'
			}
		}, {
			path: '/order',
			component: () => import('../pages/mainframe/Stock.vue'),
			meta: {
				title: '订单信息 - TogaStock股票交易系统'
			}
		}, {
			path: '/position',
			component: () => import('../pages/mainframe/Stock.vue'),
			meta: {
				title: '持仓信息 - TogaStock股票交易系统'
			}
		},{
			path: '/personalInfo',
			component: () => import('../pages/mainframe/PersonalInfo.vue'),
			meta: {
				title: '个人信息 - TogaStock股票交易系统'
			}
		},{
			path: '/userManage',
			component: () => import('../pages/mainframe/UserManage.vue'),
			meta: {
				title: '个人信息 - TogaStock股票交易系统'
			}
		},{
			path: '/help',
			component: () => import('../pages/mainframe/Help.vue'),
			meta: {
				title: '帮助 - TogaStock股票交易系统'
			}
		}, {
			path: '/about',
			component: () => import('../pages/mainframe/About.vue'),
			meta: {
				title: '关于 - TogaStock股票交易系统'
			}
		}]
	}, {
		path: '/login',
		component: () => import('../pages/Login.vue'),
		meta: {
			title: '登陆 - TogaStock股票交易系统'
		}
	}, {
		path: '/logout',
		component: () => import('../pages/Logout.vue'),
		meta: {
			title: '登陆 - TogaStock股票交易系统'
		}
	}]

let router = createRouter({
	history: createWebHistory(),
	routes: routes
})
// @ts-ignore
router.beforeEach((to, from, next) => {
	if (to.meta.title) {
		// @ts-ignore
		document.title = to.meta.title
	}
	next()

})

export default router
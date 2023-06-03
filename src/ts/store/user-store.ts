import {defineStore} from "pinia";

export const useUserStore
	= defineStore({

	id: 'user',
	state: () => {
		return {
			isLogin: true,
			user: {
				userId: 0,
				accountId: 0,
				nickName: "",
				name: "",
				phone: "",
				password: "",
				gender: "",
				createTime: "",
				updateTime: "",
				status: "",
				role: ""
			}
		}
	},
	persist: {
		enabled: true,
		strategies: [
			{
				storage: localStorage, paths: [
					'isLogin', 'user'
				]
			}
		]
	}
})
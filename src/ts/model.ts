export function roleStr(role: string): string {
	switch (role) {
		case "admin":
			return "管理员"
		case "normal":
			return "普通用户"
		default:
			return "未知"
	}
}

export type Stock = {
	tsCode: string
	symbol: string
	name: string
	area: string
	industry: string
	market: string
	exchange: string
}

export type Company = {
	companyId: number,
	tsCode: string
	exchange: string
	chairman: string,
	regCapital: number,
	website: string
	mainBusiness: string
	introduction: string
}

export type User = {
	userId: number
	accountId: number,
	nickName: string,
	name: string,
	phone: string,
	password: string,
	gender: string,
	createTime: string
	updateTime: string,
	status: string,
	role: string
}
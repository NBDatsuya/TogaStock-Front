<script setup lang="ts">
import {useUserStore} from "../ts/store.ts";
import axios from "../ts/axios";
import router from "../ts/router";

const doLogout = async () => {
	let user = useUserStore()

	user.uid = 0
	user.isLogin = false
	user.role = -1

	let res = await axios.post(
		`/logout`
	)

	if(!res.data.ok){
		return
	}

	await router.push('/login')
}

doLogout()
</script>

<template>

</template>

<style scoped>

</style>
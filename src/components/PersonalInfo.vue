<script setup lang="ts">
import {ref} from "vue";
import axios from "../ts/axios";
import pinia, {useUserStore} from "../ts/store";

import {roleStr, User} from "../ts/model";

const props = defineProps(['density'])

const userInfo = ref<User>({
})

const userStore = useUserStore(pinia)
const msgBox = ref(false)
const msgColor = ref("")
const msgContent = ref("")
const TIMEOUT = 2000

const loadComponent = async () => {
	try{
		let res = await axios.get(
			`/userInfo?user_id=${userStore.user.userId}`
		)
		if (!res.data['ok']) {
			msgContent.value = res.data['msg']
			msgColor.value = "error"
			msgBox.value = true
			return
		}
		userInfo.value = res.data.user
	}catch (e) {
		msgContent.value = "无法连接到服务器"
		msgColor.value = "error"
		msgBox.value = true
	}

}

loadComponent()
</script>

<template>
    <v-container class="text-center align-center">
        <v-card>
            <v-card-title>个人基本信息</v-card-title>
            <v-container>
                <p>用户登陆名：{{ userInfo.name }}</p>
                <p>昵称：{{ userInfo.nickName }}</p>
                <p>用户身份：{{ roleStr(userInfo.role) }}</p>
                <p v-if="density==1">联系方式：{{ userInfo.phone }}</p>
                <p v-if="density==1">性别：{{ userInfo.gender }}</p>
                <p v-if="density==1">创建日期：{{ userInfo.createTime }}</p>
                <p v-if="density==1">上一次修改日期：{{ userInfo.updateTime }}</p>
                <p>状态：{{ userInfo.status }}</p>
                <br />
                <v-btn class="bg-info">修改基本信息...</v-btn>
            </v-container>
        </v-card>
    </v-container>

    <v-snackbar
            v-model="msgBox"
            :timeout="TIMEOUT"
            :color="msgColor"
    >
        {{ msgContent }}
    </v-snackbar>
</template>

<style scoped>

</style>
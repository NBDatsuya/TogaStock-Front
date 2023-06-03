<script setup lang="ts">
import {ref} from "vue";
import {useRouter} from "vue-router"
import axios from "../ts/axios"

import pinia from "../ts/store.ts"
import {useUserStore} from "../ts/store.ts";

const router = useRouter()
const uName = ref("")
const uNameRules = ref([
	v => !!v || '用户号码是必填项',
])
const password = ref("")
const passwordRules = ref([
	v => !!v || '密码是必填项',
	v => (v && v.length >= 2) || '密码长度至少为2个字符',
])
const valid = ref(false)
const alertShow = ref(false)
const alertText = ref("")

const userStore = useUserStore(pinia)

const msgBox = ref(false)
const msgColor = ref('error')
const msgContent = ref("")
const TIMEOUT = 2000
const doLogin = async () => {

	let res = await axios.post(`/login?name=${uName.value}&password=${password.value}`)

    if (!res.data['ok']) {
        msgContent.value = res.data['msg']
        msgColor.value = "error"
        msgBox.value = true
        return
    }

    console.log(res.data)

	userStore.user = res.data.user

	userStore.isLogin = true

	await router.push("/")
}
</script>

<template>
    <div id="page">
        <v-container class="position-absolute" fluid id="login-box">
            <v-card class="elevation-12" id="login-card">
                <v-card-text>
                    <v-row>
                        <v-col>
                            <img>
                            <v-container class="text-center">
                                <img src="/img/Logo.png" alt="CRU" width="64" height="64"/>
                            </v-container>
                            <h2 class="text-center text-basic-1 pb-3">TogaStock在线股票交易系统</h2>
                            <h3 class="text-center text-basic-1">登陆</h3>
                        </v-col>
                    </v-row>

                    <v-row>
                        <v-col>
                            <v-alert
                                    v-model="alertShow"
                                    border="left"
                                    type="warning"
                                    :closable="true">
                                {{ alertText }}
                            </v-alert>
                        </v-col>
                    </v-row>

                    <v-row>
                        <v-col>
                            <v-form ref="form" v-model="valid">

                                <v-text-field
                                        v-model="uName"
                                        :rules="uNameRules"
                                        label="用户名"
                                        required
                                        clearable
                                        prepend-icon="mdi-account-circle"
                                ></v-text-field>
                                <v-text-field
                                        v-model="password"
                                        :rules="passwordRules"
                                        label="密码"
                                        type="password"
                                        required
                                        clearable
                                        prepend-icon="mdi-lock"
                                ></v-text-field>
                            </v-form>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col class="text-center">
                            <v-btn
                                    class="bg-gloria-1"
                                    @click="doLogin"
                                    :disabled="!valid"
                                    block
                                    height="50px"
                            >登陆
                            </v-btn>
                        </v-col>
                    </v-row>
                </v-card-text>
            </v-card>
        </v-container>
    </div>

    <v-snackbar
        v-model="msgBox"
        :timeout="TIMEOUT"
        :color="msgColor"
    >
        {{ msgContent }}
    </v-snackbar>
</template>

<style scoped>
#login-box {
    margin-top: 8%;
    padding: 5px;
    display: flex;
    justify-content: center;
}

#login-card {
    width: 600px;
    max-width: 600px;
}
</style>
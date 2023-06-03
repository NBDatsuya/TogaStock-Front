<script setup lang="ts">
import pinia, {useUserStore} from "../../ts/store"

const userStore = useUserStore(pinia)

import axios from '../../ts/axios';
import {Company, User} from "../../ts/model";
import {ref} from "vue";

const PAGE_COUNT = 10;
const pageCount = ref(0)
const currentPage = ref(1)

const viewList = ref<User[]>([])

/*
* 0 = detail
* 1 = delete
* 2 = add
* 3 = update
* */
const viewMode = ref(0)
const detailBox = ref(false)
const addBox = ref(false)

const viewItem = ref<User>()
const viewCompany = ref<Company>()

const msgBox = ref(false)
const msgColor = ref('error')
const msgContent = ref("")
const TIMEOUT = 2000

const getList = async function (page: number = 1) {
	try {
		const res = await axios.get(
			`/userList`
		)
		if (!res.data['ok']) {
			msgContent.value = res.data['msg']
			msgColor.value = "error"
			msgBox.value = true
			return
		}

		console.log(res.data['list'])
		const userList = res.data['list']
		viewList.value =
			userList.slice((page - 1) * PAGE_COUNT, page * PAGE_COUNT)

		pageCount.value = Math.ceil(userList.length / PAGE_COUNT)
	} catch (e) {
		msgContent.value = "无法连接到服务器"
		msgColor.value = "error"
		msgBox.value = true
	}
}

const viewDetail = (item: User) => {
	detailBox.value = true;
	viewItem.value = item
	viewMode.value = 0;
}
const viewDelete = (item: User) => {
	detailBox.value = true;
	viewItem.value = item
	viewMode.value = 1;
}
const viewInsert = () => {
	detailBox.value = true;
	viewMode.value = 2;

	viewItem.value.name = ""
	viewItem.value.nickName = ""
	viewItem.value.gender = ""
	viewItem.value.phone = ""
}
const doInsert = async () => {
	try {
		let res = await axios.post(
			`/insertUser?
            name=${viewItem.value?.name}&
            nickname=${viewItem.value?.nickName}&
            gender=${viewItem.value?.gender}&
            phone=${viewItem.value?.phone}
            `
		)

		msgContent.value = res.data['msg']

		if (!res.data['ok']) {
			msgColor.value = "error"
			msgBox.value = true
			return
		}

	} catch (e) {
		msgContent.value = "无法连接到服务器"
		msgColor.value = "error"
		msgBox.value = true
	}


	detailBox.value = false;
	viewMode.value = -1;
	getList(currentPage.value)
}

const initComponent = async () => {
	await getList()
}

initComponent()
</script>

<template>
    <v-container>
        <v-card>
            <v-card-title class="text-center align-center">
                用户列表
            </v-card-title>
            <v-card-text>
                <v-row class="ma-0 pa-0">
                    <v-col class="ma-2 pa-0">
                        <v-combobox>
                            <v-list>
                                <v-list-item>a</v-list-item>
                            </v-list>
                        </v-combobox>
                    </v-col>
                    <v-col class="ma-2 pa-0">
                        <v-text-field></v-text-field>
                    </v-col>
                    <v-col class="pa-1">
                        <v-btn class="bg-info ma-1" block>搜索</v-btn>
                        <v-btn class="bg-success ma-1" block @click="viewInsert">添加用户...</v-btn>
                    </v-col>
                </v-row>
                <v-table v-if="viewList.length>0">
                    <thead class="text-center">
                    <tr class="text-center">
                        <th class="text-center">ID</th>
                        <th class="text-center">登录名</th>
                        <th class="text-center">昵称</th>
                        <th class="text-center">状态</th>
                        <th class="text-center">性别</th>
                        <th class="text-center">联系方式</th>
                        <th class="text-center">上一次修改时间</th>
                        <th class="text-center">操作</th>
                    </tr>
                    </thead>
                    <tbody class="text-center">
                    <tr v-for="item in viewList" :key="item.userId">
                        <td>{{ item.userId }}</td>
                        <td>{{ item.nickName }}</td>
                        <td>{{ item.name }}</td>
                        <td>{{ item.status }}</td>
                        <td>{{ item.phone }}</td>
                        <td>{{ item.updateTime }}</td>
                        <td>
                            <v-btn-group>
                                <v-btn @click="viewDetail(item)">查看详情</v-btn>
                                <v-btn @click="viewDetail(item)">编辑</v-btn>
                                <v-btn @click="viewDelete(item)">删除</v-btn>
                            </v-btn-group>
                        </td>
                    </tr>
                    </tbody>
                </v-table>
                <h4 class="text-center pt-5" v-else>当前列表无用户</h4>
                <v-container>
                    <v-pagination v-if="pageCount>1"
                                  :length="pageCount"
                                  :total-visible="7"
                                  class="align-center"
                                  v-model="currentPage"
                                  @update:model-value="getList(currentPage)"
                    >

                    </v-pagination>
                </v-container>
            </v-card-text>
        </v-card>
    </v-container>

    <v-snackbar
            v-model="msgBox"
            :timeout="TIMEOUT"
            :color="msgColor"
    >
        {{ msgContent }}
    </v-snackbar>

    <v-dialog v-model="detailBox"
              width="auto"
              min-width="30%">
        <v-card>
            <v-container>
                <h1 v-if="viewMode==0">用户详情</h1>
                <h1 v-if="viewMode==1">删除用户</h1>
                <p class="text-red-accent-4" v-if="viewMode==1"><strong>你确定要删除该用户吗？</strong></p>
                <!--
                <p>ID：{{ viewItem.userId }}</p>
                <p>登录名：{{ viewItem.name }}</p>
                <p>昵称：{{ viewItem.nickName }}</p>
                <p>状态：{{ viewItem.status }}</p>
                <p>性别：{{ viewItem.gender }}</p>
                <p>联系方式：{{ viewItem.phone }}</p>
                <p>创建时间：{{ viewItem.createTime }}</p>
                <p>上一次修改时间：{{ viewItem.updateTime }}</p>
                <p>状态：{{ viewItem.status }}</p>-->
                <v-container v-if="viewMode==1">
                    <hr/>
                    <p class="text-red-accent-4"><strong>警告：该操作影响重大且无法撤销</strong></p>
                </v-container>
                <v-row v-if="viewMode==1">
                    <v-col>
                        <v-btn
                                @click="detailBox = false"
                                class="bg-red-accent-4"
                                block>确定
                        </v-btn>
                    </v-col>
                    <v-col>
                        <v-btn
                                @click="detailBox = false"
                                class="bg-info"
                                block>取消
                        </v-btn>
                    </v-col>
                </v-row>
                <v-btn
                        @click="detailBox = false"
                        class="bg-red-accent-4"
                        v-if="viewMode!=1">关闭
                </v-btn>
            </v-container>

        </v-card>
    </v-dialog>

    <v-dialog v-model="addBox"
              width="auto"
              min-width="30%">
        <v-card>
            <v-container>
                <h1>添加用户</h1>
                <p>
                    <v-text-field label="登录名" v-model="viewItem.name"></v-text-field>
                </p>
                <p>
                    <v-text-field label="昵称" v-model="viewItem.nickName"></v-text-field>
                </p>
                <p>
                    <v-text-field label="状态" v-model="viewItem.status"></v-text-field>
                </p>
                <p>
                    <v-text-field label="性别" v-model="viewItem.gender"></v-text-field>
                </p>
                <p>
                    <v-text-field label="联系方式" v-model="viewItem.phone"></v-text-field>
                </p>
                <v-row v-if="viewMode==2">
                    <v-col>
                        <v-btn
                                @click="detailBox = false"
                                class="bg-red-accent-4"
                                block>提交
                        </v-btn>
                    </v-col>
                    <v-col>
                        <v-btn
                                @click="detailBox = false"
                                class="bg-info"
                                block>取消
                        </v-btn>
                    </v-col>
                </v-row>
            </v-container>

        </v-card>
    </v-dialog>
</template>

<style scoped>

</style>
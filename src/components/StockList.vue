<script setup lang="ts">
import pinia, {useUserStore} from "../ts/store";

const userStore = useUserStore(pinia)

import axios from '../ts/axios';
import {Company, Stock} from "../ts/model";
import {ref} from "vue";

const PAGE_COUNT = 10;
const pageCount = ref(0)
const currentPage = ref(1)

const viewList = ref<Stock[]>([])

const detailBox = ref(false)
const viewItem = ref<Stock>()
const viewCompany = ref<Company>()

const msgBox = ref(false)
const msgColor = ref('error')
const msgContent = ref("")
const TIMEOUT = 2000

const getList = async function (page: number = 1) {
    try{
        const res = await axios.get(
            `/stockList`
        )
        if (!res.data['ok']) {
            msgContent.value = res.data['msg']
            msgColor.value = "error"
            msgBox.value = true
            return
        }

        const stockList = res.data['list']
        viewList.value =
            stockList.slice((page - 1) * PAGE_COUNT, page * PAGE_COUNT)

        pageCount.value = Math.ceil(stockList.length / PAGE_COUNT)
    }catch (e) {
        msgContent.value = "无法连接到服务器"
        msgColor.value = "error"
        msgBox.value = true
    }
}

const viewDetail = (item: Stock) => {
	detailBox.value = true;
    viewItem.value = item
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
                股票列表
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
                    <v-col>
                        <v-btn class="bg-info" block>搜索</v-btn>
                    </v-col>
                </v-row>
                <v-table v-if="viewList.length>0">
                    <thead class="text-center">
                    <tr class="text-center">
                        <th class="text-center">TS代码</th>
                        <th class="text-center">股票代码</th>
                        <th class="text-center">股票名称</th>
                        <th class="text-center">地域</th>
                        <th class="text-center">所属行业</th>
                        <th class="text-center">市场类型</th>
                        <th class="text-center">操作</th>
                    </tr>
                    </thead>
                    <tbody class="text-center">
                    <tr v-for="item in viewList" :key="item.tsCode">
                        <td>{{ item.tsCode }}</td>
                        <td>{{ item.symbol }}</td>
                        <td>{{ item.name }}</td>
                        <td>{{ item.area }}</td>
                        <td>{{ item.industry }}</td>
                        <td>{{ item.market }}</td>
                        <td>
                            <v-btn @click="viewDetail(item)" class="bg-info">查看详情</v-btn>
                        </td>
                    </tr>
                    </tbody>
                </v-table>
                <h4 class="text-center pt-5" v-else>当前列表无股票信息</h4>
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
            <v-card-text>
                <p>TS代码：{{ viewItem.tsCode }}</p>
                <p>股票代码：{{ viewItem.symbol }}</p>
                <p>股票名称：{{ viewItem.name }}</p>
                <p>地域：{{ viewItem.area }}</p>
                <p>所属行业：{{ viewItem.industry }}</p>
                <p>市场类型：{{ viewItem.market }}</p>
                <p>交易所：{{ viewItem.exchange }}</p>
                <hr/>
                <p>公司：{{ viewCompany.name }}</p>
                <p>法人代表：{{ viewCompany.chairman }}</p>
                <p>网站：<a :href="viewCompany.website" target="_blank">
                    {{ viewCompany.website }}</a></p>
                <p>主营业务：{{ viewCompany.mainBusiness }}</p>
                <p>简介：</p>
                <p>
                    {{ viewCompany.introduction }}
                </p>
            </v-card-text>
            <v-card-actions>
                <v-btn
                        @click="detailBox = false"
                        class="bg-red-accent-4">关闭
                </v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<style scoped>

</style>
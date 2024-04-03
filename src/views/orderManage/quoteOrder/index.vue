<template>
  <div class="c-flex-column">
    <c-search v-model:data="queryList" :config="searchConfig" />
    <c-table v-model:data="tableData" :tableConfig="tableConfig" :columnsConfig="columnsConfig" class="c-flex-1">
    </c-table>
    <c-paginatin v-if="tableData.length > 0" v-model:data="pagData" @change="onSearch" />
  </div>
</template>

<script setup lang="ts">
import { shallowRef, watch } from 'vue'
import { messageInfo, useMessage } from '@/hooks/useMessage'

// postMessage 测试
useMessage('vue3frametest')
const sendMessage = () => {
  if (messageInfo) {
    const { instance, origin } = messageInfo
    instance.postMessage({ verifyInfo: 'backData', data: '来自Vue3框架' }, { targetOrigin: origin })
  }
}

// 查询
const onSearch = () => {
  console.log('查询参数1', queryList.value)
  console.log('查询参数2', pagData.value)
}

// 搜索栏
const queryList = shallowRef({})
const options1 = [
  { value: 0, label: '待报价' },
  { value: 1, label: '已报价' },
  { value: 2, label: '已过期' },
  { value: 3, label: '已作废' },
  { value: 4, label: '已结标' }
]
const searchConfig = [
  { name: 'input', prop: 'purOrder', attr: { placeholder: '报价单号' } },
  { name: 'select', prop: 'status', attr: { options: options1, placeholder: '状态' } },
  { name: 'input', prop: 'purOrder2', attr: { placeholder: '物料编码' } },
  { name: 'date', prop: 'searchDate', attr: { type: 'daterange' } },
  { name: 'button', text: '查询', attr: { type: 'primary' }, on: { click: onSearch } },
  { name: 'button', text: '测试', attr: { type: 'primary' }, on: { click: sendMessage } }
]

// Table
const tableData = shallowRef(
  Array.from({ length: 50 }).map((_, idx) => ({
    id: idx,
    date: '待报价',
    name: '	M103-18-TP-RKS-6A-8CH',
    address: 'PQ-20900',
    number: '2023.10.11 14:02:12'
  }))
)
const tableConfig = {
  height: '100%',
  width: '100%'
}
const columnsConfig = [
  { type: 'selection' },
  { slotName: 'index' },
  { label: '报价单号', prop: 'address', width: '120', slotName: 'addArrow' },
  { label: '状态', prop: 'date', width: '70' },
  { label: '物料编码', prop: 'name', width: '180' },
  { label: '创建时间', prop: 'number', width: '150' }
]

// pagination
const pagData = shallowRef({ page: 1, pageSize: 35, total: 500 })
watch(pagData, (value) => console.log('pagData', value))
</script>

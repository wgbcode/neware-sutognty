<template>
  <div class="c-flex-column">
    <c-search v-model:data="queryList" :config="searchConfig" />
    <c-table
      v-model:data="tableData"
      :tableConfig="tableConfig"
      :columnsConfig="columnsConfig"
      class="c-flex-1"
    >
    </c-table>
    <c-paginatin v-if="tableData.length > 0" v-model:data="pagData" @change="onSearch" />
  </div>
</template>

<script setup lang="ts">
import { shallowRef, watch } from 'vue'
import { useMessage } from '@/hooks/useMessage'

// 建立 postMessage 连接
useMessage('acceptPaybacks')
// 通过 postMessage 回传消息
// const sendMessage = () => {
//   if (messageInfo) {
//     const { instance, origin } = messageInfo
//     instance.postMessage({ verifyInfo: 'backData', data: '来自Vue3框架' }, { targetOrigin: origin })
//   }
// }

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
  { name: 'select', prop: 'test1', attr: { options: options1, placeholder: '标识' } },
  { name: 'input', prop: 'test2', attr: { placeholder: '收款单号' } },
  { name: 'input', prop: 'test3', attr: { placeholder: '销售订单号' } },
  { name: 'input', prop: 'test4', attr: { placeholder: '客户代码/名称' } },
  { name: 'select', prop: 'test6', attr: { options: options1, placeholder: '状态' } },
  { name: 'button', text: '查询', attr: { type: 'primary' }, on: { click: onSearch } },
  { name: 'button', text: '新增', attr: { type: 'primary' }, on: { click: onSearch } },
  { name: 'button', text: '修改', attr: { type: 'primary' }, on: { click: onSearch } },
  { name: 'button', text: '退款', attr: { type: 'primary' }, on: { click: onSearch } }
]

// Table
const tableData = shallowRef(
  Array.from({ length: 50 }).map((_, idx) => ({
    id: idx,
    test1: '12345678',
    test2: 'SE-123456',
    test3: 'C10000',
    test4: '测试公司',
    test5: 199888,
    test6: 111444,
    test7: 199999,
    test8: '张三',
    test9: '已打印',
    test10: '新威尔',
    test11: '',
    test12: '2023-10-11 14:02:12',
    test13: ''
  }))
)
const tableConfig = {
  height: '100%',
  width: '100%'
}
const columnsConfig = [
  { type: 'selection' },
  { slotName: 'index' },
  { label: '收据号', prop: 'test1', width: '100', slotName: 'addArrow' },
  { label: '销售订单号', prop: 'test2', width: '100', slotName: 'addArrow' },
  { label: '业务伙伴代码', prop: 'test3', width: '100', slotName: 'addArrow' },
  { label: '业务伙伴名称', prop: 'test4', width: '100' },
  { label: '销售订单金额', prop: 'test5', width: '100', slotName: 'price' },
  { label: '收据金额', prop: 'test6', width: '100', slotName: 'price' },
  { label: '退款金额', prop: 'test7', width: '100', slotName: 'price' },
  { label: '销售员', prop: 'test8', width: '80', slotName: 'addArrow' },
  { label: '状态', prop: 'test9', width: '80' },
  { label: '标识', prop: 'test10', width: '80' },
  { label: '账户信息', prop: 'test11', width: '100' },
  { label: '更新时间', prop: 'test12', width: '150', slotName: 'datetime' },
  { label: '备注', prop: 'test13', width: '150' }
]

// pagination
const pagData = shallowRef({ page: 1, pageSize: 35, total: 500 })
watch(pagData, (value) => console.log('pagData', value))
</script>

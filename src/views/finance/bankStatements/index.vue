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
import { messageInfo, useMessage } from '@/hooks/useMessage'

// postMessage 测试
useMessage('bankStatements')
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

// 出纳入账
const creditedAndAccounted = () => console.log('功能开发中')

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
  { name: 'input', prop: 'test2', attr: { placeholder: '审批序号' } },
  { name: 'select', prop: 'test3', attr: { options: options1, placeholder: '入账状态' } },
  { name: 'input', prop: 'test4', attr: { placeholder: '进/出账金额' } },
  { name: 'input', prop: 'test5', attr: { placeholder: '收/付款名称' } },
  { name: 'input', prop: 'test6', attr: { placeholder: '摘要' } },
  { name: 'button', text: '查询', attr: { type: 'primary' }, on: { click: onSearch } },
  {
    name: 'button',
    text: '出纳入账',
    attr: { type: 'primary' },
    on: { click: creditedAndAccounted }
  },
  { name: 'button', text: 'PostMessage测试', attr: { type: 'primary' }, on: { click: sendMessage } }
]

// Table
const tableData = shallowRef(
  Array.from({ length: 50 }).map((_, idx) => ({
    id: idx,
    test1: '2023-10-11 14:02:12',
    test2: '2492072',
    test3: '测试公司1',
    test4: '贷款',
    test5: 199888,
    test6: 111444,
    test7: '新威尔',
    test8: '已入账',
    test9: 18769.222,
    test10: 111999.44998,
    test11: 'RC-12345',
    test12: 'EFC0002045459814'
  }))
)
const tableConfig = {
  height: '100%',
  width: '100%'
}
const columnsConfig = [
  { type: 'selection' },
  { slotName: 'index' },
  { label: '交易日期', prop: 'test1', width: '150', slotName: 'datetime' },
  { label: '审批序号', prop: 'test2', width: '120', slotName: 'addArrow' },
  { label: '收款/付款方名称', prop: 'test3', width: '130' },
  { label: '摘要', prop: 'test4', width: '100' },
  { label: '进账金额', prop: 'test5', width: '100', slotName: 'price' },
  { label: '出账金额', prop: 'test6', width: '100', slotName: 'price' },
  { label: '标识', prop: 'test7', width: '100' },
  { label: 'ERP入账状态', prop: 'test8', width: '100' },
  { label: '已入账金额', prop: 'test9', width: '100', slotName: 'price' },
  { label: '未入账金额', prop: 'test10', width: '100', slotName: 'price' },
  { label: '凭证号', prop: 'test11', width: '100' },
  { label: '银行流水号', prop: 'test12', width: '150' }
]

// pagination
const pagData = shallowRef({ page: 1, pageSize: 35, total: 500 })
watch(pagData, (value) => console.log('pagData', value))
</script>

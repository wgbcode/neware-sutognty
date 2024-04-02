<template>
  <div>
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
import { watch, shallowRef } from 'vue'

// 查询
const onSearch = () => {
  console.log('查询参数1', queryList.value)
  console.log('查询参数2', pagData.value)
}

// 搜索栏
const queryList = shallowRef({})
const options1 = [
  { value: 0, label: '是' },
  { value: 1, label: '否' }
]
const options2 = [
  { value: 0, label: '待交货' },
  { value: 1, label: '部分交货' },
  { value: 2, label: '全部交货' },
  { value: 3, label: '已对账' },
  { value: 4, label: '已结算' }
]
const searchConfig = [
  { name: 'input', prop: 'purOrder', attr: { placeholder: '采购单号' } },
  { name: 'select', prop: 'isDelay', attr: { options: options1, placeholder: '延期' } },
  { name: 'select', prop: 'status', attr: { options: options2, placeholder: '状态' } },
  { name: 'date', prop: 'searchDate', attr: { type: 'daterange' } },
  { name: 'button', text: '查询', attr: { type: 'primary' }, on: { click: onSearch } },
  { ame: 'button', text: '箱号查询', attr: { type: 'warning' } },
  { ame: 'button', text: '导出', attr: { type: 'warning' } }
]

// Table
const tableData = shallowRef(
  Array.from({ length: 50 }).map((_, idx) => ({
    id: idx,
    date: '2016.05.02',
    name: '待交货-已打印',
    address: 'PO-244380',
    number: '否'
  }))
)
const tableConfig = {
  height: '100%',
  width: '100%'
}
const columnsConfig = [
  { type: 'selection' },
  { slotName: 'index' },
  { label: '采购单号', prop: 'address', width: '120', slotName: 'addArrow' },
  { label: '下单日期', prop: 'date', width: '100' },
  { label: '计划到货日期', prop: 'date', width: '120' },
  { label: '实际到货日期', prop: 'date', width: '120' },
  { label: '延期', prop: 'number', width: '60' },
  { label: '状态', prop: 'name', width: '100' }
]

// pagination
const pagData = shallowRef({ page: 1, pageSize: 35, total: 500 })
watch(pagData, (value) => console.log('pagData', value))
</script>

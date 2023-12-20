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
import { shallowRef, watch } from 'vue'

// 查询
const onSearch = () => {
  console.log('查询参数1', queryList.value)
  console.log('查询参数2', pagData.value)
}

// 搜索栏
const queryList = shallowRef({})
const options1 = [
  { value: 0, label: '未清' },
  { value: 1, label: '未清-未打印' },
  { value: 2, label: '已清' },
  { value: 3, label: '已取消' }
]
const options2 = [
  { value: 0, label: '待填写' },
  { value: 1, label: '已填写' }
]
const searchConfig = [
  { name: 'input', prop: 'purOrder', attr: { placeholder: '装箱单号' } },
  { name: 'input', prop: 'purOrder', attr: { placeholder: '运费单号' } },
  { name: 'select', prop: 'status', attr: { options: options1, placeholder: '状态' } },
  { name: 'select', prop: 'status', attr: { options: options2, placeholder: '状态' } },
  { name: 'button', text: '查询', attr: { type: 'primary' }, on: { click: onSearch } }
]

// Table
const tableData = shallowRef(
  Array.from({ length: 50 }).map((_, idx) => ({
    id: idx,
    test1: 'PQ-20917',
    test2: 'ZX-20917',
    test3: '2022.01.03 10:11:22',
    test4: '2022.01.03 10:11:22',
    test5: 'V11001',
    test6: '新威智能公司',
    test7: '1000.01',
    test8: '11.99',
    test9: '张大右',
    test10: '已清',
    test11: '2022.01.03 10:11:22',
    test12: '已填写'
  }))
)
const tableConfig = {
  height: '100%',
  width: '100%'
}
const columnsConfig = [
  { type: 'selection' },
  { slotName: 'index' },
  { label: '采购单号', prop: 'test1', width: '120', slotName: 'addArrow' },
  { label: '装箱单号', prop: 'test2', width: '100' },
  { label: '创建时间', prop: 'test3', width: '150' },
  { label: '更新时间', prop: 'test4', width: '150' },
  { label: '业务伙伴代码', prop: 'test5', width: '110' },
  { label: '业务伙伴名称', prop: 'test6', width: '110' },
  { label: '单据总金额', prop: 'test7', width: '100' },
  { label: '未清金额', prop: 'test8', width: '100', align: 'right' },
  { label: '采购员', prop: 'test9', width: '80' },
  { label: '状态', prop: 'test10', width: '70' },
  { label: '交货日期', prop: 'test11', width: '150' },
  { label: '填写状态', prop: 'test12', width: '100' }
]

// pagination
const pagData = shallowRef({ page: 1, pageSize: 35, total: 500 })
watch(pagData, (value) => console.log('pagData', value))
</script>

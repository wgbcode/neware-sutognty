<template>
  <div>
    <c-tearch v-model:data="queryList" :config="config" />
    <c-table
      v-model:data="tableData"
      :tableConfig="tableConfig"
      :columnsConfig="columnsConfig"
      class="c-flex-1"
    >
    </c-table>
  </div>
</template>

<script setup lang="tsx">
import { shallowRef, watch } from 'vue'
import Icon from '@/components/global/icon/index.vue' // TODO：使用tsx语法时，无法识别全局组件，需重复引入

// virTable
// TODO：虚假化表格组件功能完善
const tableConfig = { type: 'virTable' }
const tableData = shallowRef(
  Array.from({ length: 1000 }).map((_, idx) => ({
    id: 'row-' + idx,
    parentId: null,
    checked: false,
    number: idx * 10,
    number2: idx * 20,
    inputTest: 123,
    selectTest: 'Option1',
    datePickerTest: '2023.01.01'
  }))
)
const selectOptions = [
  { value: 'Option1', label: 'Option1' },
  { value: 'Option2', label: 'Option2' },
  { value: 'Option3', label: 'Option3' }
]
const columnsConfig = [
  { key: 'selection' },
  { key: 'index' },
  { dataKey: 'number', title: 'number', width: 150 },
  { dataKey: 'number2', title: 'number2', width: 150, cellRenderer: addIcon },
  { key: 'input', datakey: 'inputTest', title: 'inputTest' },
  { key: 'select', datakey: 'selectTest', title: 'selectTest', options: selectOptions },
  {
    key: 'datePicker',
    datakey: 'datePickerTest',
    title: 'datePickerTest',
    config: { type: 'date', format: 'YYYY.MM.DD', placeholder: '请输入' }
  }
]
function addIcon({ cellData: name }: Record<string, number>) {
  return (
    <div class="c-flex-ycenter">
      <Icon name="test" color="white" class="c-mr5" />
      <span>{name}</span>
    </div>
  )
}
watch(tableData, (value) => console.log('tableData', value))

// Search
const initials = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j']
const options = Array.from({ length: 1000 }).map((_, idx) => ({
  value: `Option${idx + 1}`,
  label: `${initials[idx % 10]}${idx} `
}))
const queryList = shallowRef({})
const onSearch = () => console.log('查询参数', queryList)
const config = [
  { name: 'input', prop: 'testInput', attr: { type: 'text' }, on: { keyup: onSearch } },
  { name: 'select', prop: 'testSelect', attr: { options } },
  { name: 'date', prop: 'testDate', attr: { shortcuts: true } },
  { name: 'button', text: '查询', attr: { type: 'primary' }, on: { click: onSearch } }
]
watch(queryList, (value) => console.log('queryList', value))
</script>

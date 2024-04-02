<template>
  <div class="c-flex-column">
    <c-search v-model:data="queryList" :config="config" />
    <c-table v-model:data="tableData" :tableConfig="tableConfig" :columnsConfig="columnsConfig" class="c-flex-1">
      <template #date="row">
        <div>{{ row.date }}</div>
      </template>
      <template #name="row">
        <div>{{ row.name }}</div>
      </template>
      <template #address="row">
        <div>{{ row.address }}</div>
      </template>
      <template #expand>
        <div>请自定义插槽模板</div>
      </template>
    </c-table>
  </div>
</template>

<script setup lang="ts">
import { ref, shallowRef, watch } from 'vue'
// Table
interface User {
  date: string
  name: string
  address: string
}
const tableData = shallowRef(
  Array.from({ length: 10 }).map((_, idx) => ({
    id: idx,
    date: '2016-05-02',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
    number: idx * 100
  }))
)
const tableConfig = {
  height: '100%',
  width: '100%',
  isCustomFooter: true,
  footerMethod: footMethod,
  'row-class-name': tableRowClassName,
  'default-sort': { prop: 'date', order: 'descending' },
  on: { 'current-change': handleCurrentChange }
}
const columnsConfig = [
  { type: 'expand' },
  { type: 'selection' },
  { slotName: 'index' },
  {
    prop: 'date',
    label: 'Date',
    width: '150',
    slotName: 'addArrow',
    slotParams: { type: 'date' },
    slotOn: { click: clickArrow }
  },
  {
    label: 'test',
    child: [
      { prop: 'name', label: 'Name', slotName: 'treeSelect' },
      { label: 'test8', prop: 'test8', slotName: 'input' },
      {
        label: 'test2',
        child: [
          {
            label: 'address',
            prop: 'address',
            width: '250',
            slotName: 'address',
            headerSlotName: 'tooltip',
            headerSlotParams: { content: 'Top Center prompts info' }
          },
          { label: 'number', prop: 'number', slotName: 'number', sortable: true, width: '150' }
        ]
      }
    ]
  },
  { label: 'test3', prop: 'test3', slotName: 'datePicker' },
  {
    label: 'test4',
    prop: 'test4',
    slotName: 'datePicker',
    slotAttr: { type: 'datetime' },
    headerSlotName: 'tooltip',
    headerSlotParams: { content: 'Top Center prompts info' }
  },
  {
    label: 'test5',
    prop: 'test5',
    slotName: 'input',
    slotParams: { type: 'number', min: 0, max: 1000000 },
    slotOn: { change: handleChange }
  },
  { label: 'test6', prop: 'test6', slotName: 'select', slotOn: { change: handleChange } },
  { label: 'test7', prop: 'test7', slotName: 'input' }
]
function tableRowClassName({ rowIndex }: Record<string, number>) {
  let name = ''
  switch (rowIndex) {
    case 1:
      name = 'warning-row'
      break
    case 3:
      name = 'success-row'
      break
  }
  return name
}
const currentRow = ref()
function handleCurrentChange(val: User | undefined) {
  currentRow.value = val
  console.log('handleCurrentChange', val)
}
function handleChange(value: number) {
  console.log('handleChange', value)
}
function clickArrow() {
  console.log('我被点击了...')
}
function footMethod(prop: string, values: number[]) {
  let res = ''
  const textLabel = 'address'
  const numLabels = ['number']
  if (prop === textLabel) res = '合计'
  else if (!values.every((value) => Number.isNaN(value))) {
    numLabels.forEach((label) => {
      res =
        prop === label
          ? `${values.reduce((prev, curr) => (Number.isNaN(Number(curr)) ? prev : prev + curr), 0)}`
          : ''
    })
  }
  return res
}
watch(tableData, (value) => console.log('tableData', value))

// Search
const initials = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j']
const options = Array.from({ length: 1000 }).map((_, idx) => ({
  value: `Option${idx + 1}`,
  label: `${initials[idx % 10]}${idx}`
}))
const onSearch = () => console.log('查询')
const queryList = shallowRef({})
const config = [
  { name: 'input', prop: 'testInput', attr: { type: 'text' }, on: { keyup: onSearch } },
  { name: 'select', prop: 'testSelect', attr: { options } },
  { name: 'date', prop: 'testDate3', attr: { type: 'datetimerange', shortcuts: true } },
  { name: 'date', prop: 'testDate', attr: { shortcuts: true } },
  { name: 'date', prop: 'testDate2', attr: { type: 'daterange', shortcuts: true } },
  { name: 'date', prop: 'testDate5', attr: { type: 'monthrange', shortcuts: true } },
  { name: 'date', prop: 'testDate4', attr: { type: 'datetime', shortcuts: true } },
  { name: 'treeSelect', prop: 'treeSelect' },
  { name: 'button', text: '查询', attr: { type: 'primary' }, on: { click: onSearch } }
]
watch(queryList, (value) => console.log('queryList', value))
</script>

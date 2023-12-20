<template>
  <el-pagination
    v-model:current-page="newData.page"
    v-model:page-size="newData.pageSize"
    :total="newData.total"
    @current-change="emitParentEvent"
    @size-change="emitParentEvent"
    :page-sizes="pageSizeArr"
    layout="total, sizes, prev, pager, next, jumper"
  />
</template>

<script setup lang="ts">
import useVModel from '@/hooks/useVModel'
import { type PropType } from 'vue'

type Data = {
  page: number
  pageSize: number
  total: number
}
const props = defineProps({
  data: {
    type: Object as PropType<Data>,
    required: true
  },
  pageSizeArr: Object,
  change: Function
})
const pageSizeArr = props.pageSizeArr || [35, 100, props.data.total]

// 子组件数据改变时，通知父组件修改数据
const emit = defineEmits(['update:data', 'change'])
const newData = useVModel(props, 'data', emit)

// 触发父组件自定义事件
const emitParentEvent = () => emit('change')
</script>

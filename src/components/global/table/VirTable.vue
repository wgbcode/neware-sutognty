<template>
  <!-- 父元素高度需固定 -->
  <el-auto-resizer>
    <template #default="{ height, width }">
      <el-table-v2
        v-model:data="newData"
        v-bind="tableConfig"
        :columns="columnsConfig"
        :width="width"
        :height="height"
      />
    </template>
  </el-auto-resizer>
</template>

<script setup lang="ts">
import useVModel from '@/hooks/useVModel'
const props = defineProps({
  data: Array,
  tableConfig: Object,
  columnsConfig: Object
})

// 数据改变时，通知根组件修改数据
const emit = defineEmits(['update:data'])
const newData = useVModel(props, 'data', emit)
</script>

<template>
  <el-table :data="data" :tableConfig="tableConfig" v-on="tableConfig.on">
    <template v-for="(item, index) in columnsConfig" :key="index">
      <TableColumn :config="item" :data="data" v-bind="$attrs">
        <!-- 插槽向下传递 -->
        <template v-for="(_, name) in $slots" #[name]="row">
          <slot :name="name" v-bind="row" />
        </template>
      </TableColumn>
    </template>
  </el-table>
</template>

<script setup lang="ts">
import type { PropType } from 'vue'
import TableColumn from './TableColumn.vue'

defineProps({
  data: {
    type: Array as PropType<Record<string, any>[]>,
    required: true
  },
  tableConfig: {
    type: Object,
    required: true
  },
  columnsConfig: {
    type: Object,
    required: true
  }
})
</script>

<template>
  <div class="c-flex-ycenter c-flex-only-wrap">
    <div v-for="(item, index) in newConfig" :key="index">
      <component
        v-if="item.isShow"
        :is="matchMap[item.name]"
        v-model="newData[item.prop]"
        v-bind="item.attr"
        :style="{ ...item.style }"
        :text="item.text"
        :on="item.on"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import Button from './Button.vue'
import Input from './Input.vue'
import Select from './Select.vue'
import TreeSelect from './TreeSelect.vue'
import DatePicker from './DatePicker.vue'
import { type PropType, type Component } from 'vue'
import addDefaultConfig from './addDefaultConfig'
import useVModel from '@/hooks/useVModel'

export type Config = {
  name: string
  prop: string
  text?: string
  isShow?: boolean
  attr?: Record<string, any>
  style?: Record<string, any>
  on?: Record<string, any>
}[]
const props = defineProps({
  data: {
    type: Object,
    required: true
  },
  config: {
    type: Object as PropType<Config>,
    required: true
  }
})
const matchMap: Record<string, Component> = {
  button: Button,
  input: Input,
  select: Select,
  treeSelect: TreeSelect,
  date: DatePicker
}
const newConfig = addDefaultConfig(props.config)

// 子组件数据改变时，通知根组件修改数据
const emit = defineEmits(['update:data'])
const newData = useVModel(props, 'data', emit)
</script>

<style scoped lang="scss"></style>

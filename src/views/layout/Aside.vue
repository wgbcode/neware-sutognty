<template>
  <div>
    <el-row>
      <el-menu :default-active="defaultActive" asideRoutes :unique-opened="true" text-color="#fff"
        @select="handleMenuSelect">
        <AsideItem v-for="route in asideRoutes" :key="route.name" :item="route" class="c-forbidSelect" />
      </el-menu>
    </el-row>
    <div v-if="!isSystem" class="c-flex-center c-mb10">
      <img class="c-h14" src="@images/logo-word.png" alt="" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import router from '@/router'
import { type RouteRecordRaw } from 'vue-router'
import AsideItem from './AsideItem.vue'
import { onMounted, ref } from 'vue'

const props = defineProps({
  isSystem: {
    type: Boolean,
    default: false
  }
})

const defaultActive = ref<string>()
const asideRoutes = ref<RouteRecordRaw[]>([])
const handleMenuSelect = (path: string) => router.push({ path })
onMounted(() => {
  defaultActive.value = props.isSystem ? '/moduleManager' : '/accountCenter'
  const matchName = props.isSystem ? 'systemSetting' : 'vue3home'
  const matchData = router.getRoutes().find((i) => i.name === matchName)!.children!
  asideRoutes.value = props.isSystem
    ? matchData.filter((i) => ['BaseConfig'].includes(i.name as string))
    : matchData
})
</script>

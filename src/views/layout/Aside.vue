<template>
  <div>
    <el-row>
      <el-menu
        default-active="/accountCenter/home"
        asideRoutes
        :unique-opened="true"
        text-color="#fff"
        @select="handleMenuSelect"
      >
        <AsideItem
          v-for="route in asideRoutes"
          :key="route.name"
          :item="route"
          class="c-forbidSelect"
        />
      </el-menu>
    </el-row>
    <div class="c-flex-center c-mb10"><img class="c-h14" src="@images/logo-word.png" alt="" /></div>
  </div>
</template>

<script lang="ts" setup>
import router from '@/router'
import { type RouteRecordRaw } from 'vue-router'
import AsideItem from './AsideItem.vue'
import { onMounted, ref } from 'vue'

const asideRoutes = ref<RouteRecordRaw[]>([])
const handleMenuSelect = (path: string) => router.push({ path })
onMounted(() => {
  asideRoutes.value = router.getRoutes().filter((i) => i.name === 'layout')[0].children!
})
</script>

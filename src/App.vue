<template>
  <div class="wrapper">
    <router-view></router-view>
  </div>
</template>

<script setup lang="ts">
import { pinia } from '@/stores/auth'
import { reactive, watch } from 'vue'

// pinia 数据持久化(可优化，看项目需求)
const localStore = sessionStorage.getItem('VU3PINIASTATE')
localStore && (pinia.state.value = reactive(JSON.parse(localStore)))
watch(pinia.state, (state) => sessionStorage.setItem('VU3PINIASTATE', JSON.stringify(state)), {
  deep: true
})
</script>

<style scoped lang="scss">
.wrapper {
  height: 100%;
}
</style>

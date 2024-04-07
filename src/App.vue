<template>
  <div class="wrapper">
    <router-view />
  </div>
</template>

<script setup lang="ts">
// import { pinia } from '@/stores/auth'
// import { reactive, watch } from 'vue'

// pinia 数据持久化(可优化，看项目需求)
// const localStore = sessionStorage.getItem('VU3PINIASTATE')
// localStore && (pinia.state.value = reactive(JSON.parse(localStore)))
// watch(
//   pinia.state,
//   (state) => {
//     let cache: Record<string, any>[] = []
//     const str = JSON.stringify(state, function (_, value) {
//       if (typeof value === 'object' && value !== null) {
//         // 如果有循环引用，直接跳过，不克隆
//         if (cache.indexOf(value) !== -1) return
//         cache.push(value)
//       }
//       return value
//     })
//     cache = []
//     sessionStorage.setItem('VU3PINIASTATE', str)
//   },
//   { deep: true }
// )
</script>

<style scoped lang="scss">
.wrapper {
  height: 100%;
}
</style>

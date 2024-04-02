import App from '@/App.vue'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { ref } from 'vue'
import { defineStore } from 'pinia'

// 鉴权前先初始化 app 和 pinia
export const pinia = createPinia()
export const app = createApp(App).use(pinia)

export interface ModuleTree {
  item: Record<string, any>
  children: ModuleTree[]
}

export const authStore = defineStore('auth', () => {
  const token = ref<string>('')
  const refreshToken = ref<string>('')
  const modulesTree = ref<ModuleTree[]>()

  const setToken = (newToken: string) => (token.value = newToken)
  const removeToken = () => (token.value = '')
  const setRefreshToken = (newRefreshToken: string) => (refreshToken.value = newRefreshToken)
  const removeRefreshToken = () => (refreshToken.value = '')
  const setModulesTree = (newModulesTree: ModuleTree[]) => (modulesTree.value = newModulesTree)

  return {
    token,
    refreshToken,
    modulesTree,
    setToken,
    removeToken,
    setRefreshToken,
    removeRefreshToken,
    setModulesTree
  }
})()

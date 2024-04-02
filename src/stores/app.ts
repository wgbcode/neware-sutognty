import { ref } from 'vue'
import { defineStore } from 'pinia'

export const appStore = defineStore('app', () => {
  const styleTheme = ref<string>('')
  const isOnlyShowMain = ref<Boolean>(false)
  const saveStyleTheme = (newStyleTheme: string) => (styleTheme.value = newStyleTheme)
  const saveIsOnlyShowMain = (newValue: Boolean) => (isOnlyShowMain.value = newValue)
  return {
    styleTheme,
    isOnlyShowMain,
    saveStyleTheme,
    saveIsOnlyShowMain
  }
})()

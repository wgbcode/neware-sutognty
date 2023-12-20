import { ref } from 'vue'
import { defineStore } from 'pinia'

export const appStore = defineStore('app', () => {
  const styleTheme = ref<string>('')
  const saveStyleTheme = (newStyleTheme: string) => (styleTheme.value = newStyleTheme)
  return { styleTheme, saveStyleTheme }
})()

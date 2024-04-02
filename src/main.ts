import '@/styles/main.css'
import { type Component } from 'vue'
import ElementPlus from 'element-plus'
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
import 'element-plus/dist/index.css'
import { app } from '@/stores/auth'
import router from './router'
import Icon from '@/components/global/icon/index.vue'
import CommonSearch from '@/components/global/search/index.vue'
import CommonTable from '@/components/global/table/index.vue'
import CommonPaginatin from '@/components/global/pagination/index.vue'
import 'virtual:svg-icons-register'
import '@/permission'

// 全局注册组件
const registerComponent = (mapObj: Record<string, Component>) => {
  for (const [key, component] of Object.entries(mapObj)) {
    app.component(key, component)
  }
}
const globalComponentMap = {
  Icon: Icon, // 自定义 Icon 组件
  'c-search': CommonSearch, // 搜索栏
  'c-table': CommonTable, // 表格（分页模式或虚拟列表模式）
  'c-paginatin': CommonPaginatin // 分页器
}
registerComponent(globalComponentMap)

app.use(router).use(ElementPlus, { size: 'small', zIndex: 3000, locale: zhCn }).mount('#app')

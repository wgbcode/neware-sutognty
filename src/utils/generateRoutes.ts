import { type RouteRecordRaw } from 'vue-router'
import { authStore, type ModuleTree } from '@/stores/auth'

// 获取1-5级动态路由映射，入口文件必须为 index.vue
const modules = import.meta.glob('../views/*/**/**/**/**/index.vue')
const navRoutes: RouteRecordRaw[] = []
const getNewRouter = (data: ModuleTree[], childrenPath?: RouteRecordRaw[]) => {
  data
    .sort((a, b) => a.item.sortNo - b.item.sortNo)
    .forEach((ele) => {
      let newUrl
      const { item, children } = ele
      const { code, name, url, iconName } = item
      code === 'systemSetting' && (newUrl = '/system') // 系统设置
      const obj = {
        path: newUrl || url,
        name: code,
        meta: { title: name, icon: iconName, hidden: false },
        component: modules[`../views${newUrl ? newUrl : url}/index.vue`],
        children: []
      }
      children.length > 0 && getNewRouter(children, obj.children)
      childrenPath ? childrenPath.push(obj) : navRoutes.push(obj)
    })
}

export const generateRoutes = (result: ModuleTree[]): RouteRecordRaw => {
  authStore.setModulesTree(result)
  getNewRouter(result)
  const willAddRoute = {
    path: '/layout',
    name: 'layout',
    component: () => import('@/views/layout/index.vue'),
    children: navRoutes.filter((i) => ['vue3home', 'systemSetting'].includes(i.name as string))
  }
  return willAddRoute
}

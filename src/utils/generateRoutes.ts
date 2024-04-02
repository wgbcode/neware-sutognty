import { type RouteRecordRaw } from 'vue-router'
import { authStore, type ModuleTree } from '@/stores/auth'

const modules = import.meta.glob('../views/*/*.vue')
const navRoutes: RouteRecordRaw[] = []
const getNewRouter = (data: ModuleTree[], childrenPath?: RouteRecordRaw[]) => {
  data
    .sort((a, b) => a.item.sortNo - b.item.sortNo)
    .forEach((ele) => {
      const { item, children } = ele
      const { code, name, url, iconName } = item
      if (!childrenPath) {
        const obj = {
          path: url,
          name: code,
          meta: { title: name, icon: iconName, hidden: false },
          children: []
        }
        children.length > 0 && getNewRouter(children, obj.children)
        navRoutes.push(obj)
      } else {
        const obj = {
          path: url,
          name: code,
          meta: { title: name, icon: iconName, hidden: false },
          component: modules[`../views${url}.vue`],
          children: []
        }
        children.length > 0 && getNewRouter(children, obj.children)
        childrenPath.push(obj)
      }
    })
}

export const generateRoutes = (result: ModuleTree[]): RouteRecordRaw => {
  authStore.setModulesTree(result)
  getNewRouter(result)
  const willAddRoute = {
    path: '/layout',
    name: 'layout',
    component: () => import('@/views/layout/index.vue'),
    children: navRoutes.filter((i) => i.name === 'vue3home')
  }
  return willAddRoute
}

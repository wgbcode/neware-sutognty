import { type RouteRecordRaw } from 'vue-router'
import { authStore, type ModuleTree } from '@/stores/auth'

// 获取1-5级动态路由映射，入口文件必须为 index.vue
const modules = import.meta.glob('../views/*/**/**/**/**/index.vue')
const navRoutes: RouteRecordRaw[] = []
// 将路径首字母全部转成小写
const lowerFirstLetter = (path: string) => {
    if (path.length === 0) return path
    let parts = path.split('/')
    for (let i = 0; i < parts.length; i++) {
        let part = parts[i]
        if (part.length > 0) {
            parts[i] = part[0].toLowerCase() + part.substring(1)
        }
    }
    return parts.join('/')
}
const getNewRouter = (data: ModuleTree[], childrenPath?: RouteRecordRaw[]) => {
    data
        .sort((a, b) => a.item.sortNo - b.item.sortNo)
        .forEach((ele) => {
            let key = '', newUrl = ''
            const { item, children } = ele
            const { code, name, url, iconName } = item
            if (code === 'systemSetting') {
                // 系统设置菜单
                newUrl = '/system'
                key = '../views/system/index.vue'
            } else {
                // path 首字母转小写，并删除后缀 index|Index
                newUrl = lowerFirstLetter(url).replace('/index', '').replace('/Index', '')
                key = `../views${url}/index.vue`
            }
            const obj = {
                path: newUrl,
                name: code,
                meta: { title: name, icon: iconName, hidden: false },
                component: modules[key],
                children: []
            }
            children.length > 0 && getNewRouter(children, obj.children)
            childrenPath ? childrenPath.push(obj) : navRoutes.push(obj)
        })
}


export const generateRoutes = (result: ModuleTree[]): RouteRecordRaw => {
    console.log(111, modules)
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

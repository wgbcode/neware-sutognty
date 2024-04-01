import { type RouteRecordRaw } from 'vue-router'

const navRoutes: RouteRecordRaw[] = []
const navRoutes2: RouteRecordRaw[] = [
    {
        path: '/accountCenter',
        name: 'AccountCenter',
        meta: { title: '账号中心', icon: 'account-center', hidden: false },
        children: [
            {
                path: '/accountCenter/home',
                name: 'Home',
                meta: { title: '主页', icon: '', hidden: false },
                component: () => import('@/views/accountCenter/Home.vue')
            },
            {
                path: '/accountCenter/accountInfo',
                name: 'AccountInfo',
                meta: { title: '账号资料', icon: '', hidden: false },
                component: () => import('@/views/accountCenter/AccountInfo.vue')
            },
            {
                path: '/accountCenter/modifyPassword',
                name: 'ModifyPassword',
                meta: { title: '修改资料', icon: '', hidden: false },
                component: () => import('@/views/accountCenter/ModifyPassword.vue')
            }
        ]
    },
    {
        path: '/orderManage',
        name: 'OrderManage',
        meta: { title: '订单管理', icon: 'order-manage', hidden: false },
        children: [
            {
                path: '/orderManage/purchaseOrder',
                name: 'PurchaseOrder',
                meta: { title: '采购订单', icon: '', hidden: false, keepAlive: true },
                component: () => import('@/views/orderManage/PurchaseOrder.vue')
            },
            {
                path: '/orderManage/quoteOrder',
                name: 'QuoteOrder',
                meta: { title: '报价单', icon: '', hidden: false, keepAlive: true },
                component: () => import('@/views/orderManage/QuoteOrder.vue')
            },
            {
                path: '/orderManage/logisticsOrder',
                name: 'LogisticsOrder',
                meta: { title: '物流订单', icon: '', hidden: false, keepAlive: true },
                component: () => import('@/views/orderManage/LogisticsOrder.vue')
            }
        ]
    },
    {
        path: '/test',
        name: 'test',
        meta: { title: '测试', icon: 'test', hidden: false },
        children: [
            {
                path: '/test/index',
                name: 'index',
                meta: { title: '基础', icon: '', hidden: false },
                component: () => import('@/views/test/index.vue')
            },
            {
                path: '/test/CommonSearch',
                name: 'CommonSearch',
                meta: { title: '搜索栏', icon: '', hidden: false },
                component: () => import('@/views/test/CommonSearch.vue')
            },
            {
                path: '/test/CommonTable',
                name: 'CommonTable',
                meta: { title: '表格', icon: '', hidden: false, keepAlive: true },
                component: () => import('@/views/test/CommonTable.vue')
            },
            {
                path: '/test/CommonPaginatin',
                name: 'CommonPaginatin',
                meta: { title: '分页器', icon: '', hidden: false, keepAlive: true },
                component: () => import('@/views/test/CommonPaginatin.vue')
            },
            {
                path: '/test/CommonVirTable',
                name: 'CommonVirtualTable',
                meta: { title: '虚拟化表格', icon: '', hidden: false, keepAlive: true },
                component: () => import('@/views/test/CommonVirTable.vue')
            }
        ]
    }
]
const getNewRouter = (data: Record<string, any>[], childrenPath?: RouteRecordRaw[]) => {
    data.forEach(ele => {
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
            const newUrl = `@/views${url}`
            const obj = {
                path: url,
                name: code,
                meta: { title: name, icon: iconName, hidden: false },
                component: () => import(newUrl),
                children: []
            }
            children.length > 0 && getNewRouter(children, obj.children)
            childrenPath.push(obj)
        }

    })
}

export const generateRoutes = (result: Record<string, any>[]): RouteRecordRaw => {
    getNewRouter(result)
    const willAddRoute = {
        path: '/layout',
        name: 'layout',
        component: () => import('@/views/layout/index.vue'),
        children: [...navRoutes, ...navRoutes2]
    }
    return willAddRoute
}


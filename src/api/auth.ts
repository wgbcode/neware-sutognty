import request from '@/utils/request'
import type { RouteRecordRaw } from 'vue-router'

interface UserInfo {
  code: number
  data: RouteRecordRaw
}

// 登录
export function Login(data: Record<string, string>) {
  return request({
    url: '/Login',
    method: 'post',
    data,
    isCancelRepeatRequest: true // 不允许重复请求
  })
}

// 获取用户信息(如路由)
export function GetUserInfo(_params: string): Promise<UserInfo> {
  // TODO：动态路由（暂时先写死）
  const navRoutes = [
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
  const willAddRoute = {
    path: '/layout',
    name: 'layout',
    component: () => import('@/views/layout/index.vue'),
    children: navRoutes
  }

  return new Promise((resolve) => resolve({ code: 1, data: willAddRoute }))

  // return request({
  //   url: '/GetUserInfo',
  //   method: 'get',
  //   params,
  //   isCancelRepeatRequest: true
  // })
}

// 获取二维码
export function GetLoginQRCode() {
  return request({
    url: '/LoginWithScanCode',
    method: 'post'
  })
}

// 校验用户扫码登录情况
export function ValidateLogin(params: Record<string, string>) {
  return request({
    url: '/LoginStatusDetection',
    method: 'post',
    params
  })
}

// 刷新已过期 token
export function RefreshToken(params: string) {
  return request({
    url: '/RefreshToken',
    method: 'get',
    params
  })
}

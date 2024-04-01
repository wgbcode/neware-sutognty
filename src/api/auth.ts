import request from '@/utils/request'
import type { RouteRecordRaw } from 'vue-router'

interface UserInfo {
  code: number
  data: RouteRecordRaw
}

// 登录
export function Login(data: Record<string, string>) {
  return request({
    url: '/check/login',
    method: 'post',
    data,
    isCancelRepeatRequest: true // 不允许重复请求
  })
}

// 退出
export function Logout(data: Record<string, string>) {
  return request({
    url: '/check/login',
    method: 'post',
    data,
    isCancelRepeatRequest: true // 不允许重复请求
  })
}

// 获取动态路由
export function GetModulesTree(params: Record<string, string>) {
  return request({
    url: '/Check/GetModulesTree',
    method: 'get',
    params
  })
}

// 获取二维码
export function GetLoginQRCode() {
  return request({
    url: '/QrCode/GetV2',
    method: 'get'
  })
}

// 校验用户扫码登录情况
export function ValidateLogin(params: Record<string, string>) {
  return request({
    url: 'QrCode/ValidateLoginStateV2',
    method: 'get',
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

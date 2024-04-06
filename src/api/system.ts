import { getToken } from '@/utils/auth'
import request from '@/utils/request'

// 获取模块列表数据
export function getModules() {
    return request({
        url: '/check/getmodules',
        method: 'get',
        params: { token: getToken() }
    })
}
import router from '@/router'
import { authStore } from '@/stores/auth'
import { setToken, getToken } from '@/utils/auth'
import { GetModulesTree } from '@/api/auth'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import { ElMessage } from 'element-plus'
import { generateRoutes } from '@/utils/generateRoutes'

// 配置全局前置守卫
router.beforeEach(async (to) => {
  NProgress.start()

  // 路径中有 token 时，保存 token
  const queryToken = to.query['x-token'] as string
  if (queryToken) {
    setToken(queryToken)
    authStore.setToken(queryToken)
  }

  // token 存在
  const token = getToken()
  const isExitRouter = router.getRoutes().find((i) => i.name === 'layout')
  if (token && !isExitRouter) {
    const localStore = sessionStorage.getItem('WMSPINIASTATE')
    let modulesTree = localStore && JSON.parse(localStore).auth.modulesTree
    if (!modulesTree) {
      try {
        const res = await GetModulesTree({ token }) // 获取路由信息
        const { code, message, result } = res
        code === 200 ? (modulesTree = result) : ElMessage({ type: 'warning', message })
      } catch (error) {
        ElMessage({ type: 'error', message: error as string })
      }
    }
    if (modulesTree) {
      const willAddRoute = generateRoutes(modulesTree)
      router.addRoute(willAddRoute) // 动态加载路由
      console.log(router.getRoutes())
      router.push({ ...to, replace: true })
    }
  }

  // 重定向到登录页面，且避免无限重定向
  if (!token && to.name !== 'login') {
    return { name: 'login' }
  }
})

// 配置全局后置守卫
router.afterEach((_to, _from) => NProgress.done())

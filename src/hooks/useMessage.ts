let messageInfo: undefined | Record<string, any>
const useMessage = (verifyInfo: string) => {
  let instance: undefined | Record<string, any>
  const postOrigin = [
    'http://erp.neware.com.cn',
    'https://erp.neware.com.cn',
    'http://bi.neware.com.cn',
    'https://bi.neware.com.cn',
    'http://localhost:1803'
  ]
  // 接收发过来的消息，并保存页面实例
  const handlerFn = (e: Record<string, any>) => {
    console.log(111222, e)
    if (postOrigin.includes(e.origin) && e.data.verifyInfo === verifyInfo) {
      messageInfo = { origin: e.origin, instance: e.source }
      // 关闭本页面的定示器
      instance = e.source
      // 关闭另一个页面的定时器
      instance?.postMessage({ verifyInfo: 'clearInterval' }, e.origin)
    }
  }
  window.addEventListener('message', handlerFn)
  let timer: null | number = setInterval(() => {
    if (instance) {
      window.removeEventListener('message', handlerFn)
      timer && clearInterval(timer)
      timer = null
    }
  }, 1000)
}
export { useMessage, messageInfo }

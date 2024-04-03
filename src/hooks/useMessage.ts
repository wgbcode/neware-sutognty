interface MessageInfo {
  origin: string
  instance: MessageEventSource
  data: unknown
}

// 使用 postMessag 实现跨系统通讯
let instance: null | MessageEventSource
let messageInfo: null | MessageInfo
const useMessage = (verifyInfo: string) => {
  const postOrigin = [
    'http://erp.neware.com.cn',
    'https://erp.neware.com.cn',
    'http://bi.neware.com.cn',
    'https://bi.neware.com.cn',
    'http://localhost:1803'
  ]
  const handlerFn = (e: MessageEvent) => {
    if (postOrigin.includes(e.origin) && e.data.verifyInfo === verifyInfo) {
      messageInfo = { origin: e.origin, instance: e.source!, data: e.data.data }
      // 关闭本页面的定时器
      instance = e.source
      // 关闭另一个页面的定时器
      instance?.postMessage({ verifyInfo: 'clearInterval' }, { targetOrigin: e.origin })
    }
  }
  // 接收发过来的消息，并保存页面实例、源页面地址、初始化数据
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

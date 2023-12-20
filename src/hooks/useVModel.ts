import { computed } from 'vue'
import { deepClone } from '@/utils/common'

interface Props {
  [key: string]: any
}

const useVModel = <T extends Props, K extends keyof T>(
  props: T,
  propName: string,
  emit: Function,
  deep = true
) => {
  const initRef = props[propName]
  const handler: ProxyHandler<T[K]> = {
    get(target, key) {
      const ref = Reflect.get(target, key)
      const isObj = typeof ref === 'object' && ref !== null
      return isObj && deep ? new Proxy(ref, handler) : ref // 递归(是否开启由deep控制)
    },
    set(target, key, value) {
      if (Reflect.get(target, key) !== value) {
        Reflect.set(target, key, value)
        emit(`update:${propName}`, deepClone(initRef))
      }
      return true
    }
  }
  const data = computed({
    get() {
      const isObj = typeof initRef === 'object' && initRef !== null
      // 如果是对象，需要监听内部数据，因为数据发生变化时，地址不会发生变化，set方法也不会触发
      return isObj ? new Proxy(initRef, handler) : initRef
    },
    set(val) {
      emit(`update:${propName}`, val)
    }
  })
  return data
}

export default useVModel

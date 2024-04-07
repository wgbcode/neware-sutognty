// 将list转成tree，使用前注意把array进行深拷贝
export interface Modules {
  sortNo: number
  id: string
  name: string
  iconName: string
  parentId: string | null
  code: string
  url: string
  cascadeId: string
  isSys: Boolean
  children?: null | Modules[]
}
export function listToTreeSelect(
  array: Modules[],
  parent?: Modules | { id: null },
  tree?: Modules[]
) {
  tree = typeof tree !== 'undefined' ? tree : []
  parent = typeof parent !== 'undefined' ? parent : { id: null }
  const children = array.filter((val) => parent && val.parentId === parent.id)
  if (children.length > 0) {
    if (parent.id === null) {
      tree = children
    } else {
      parent['children'] = children
    }
    children.sort((a, b) => a.sortNo - b.sortNo)
    children.forEach((val) => listToTreeSelect(array, val))
  }
  return tree
}

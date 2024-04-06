<template>
    <div class="c-flex-column">
        <c-search v-model:data="queryList" :config="searchConfig" />
        <TreeTable class="c-flex-1" :data="modulesTree" />
    </div>
</template>

<script setup lang="tsx">
import { listToTreeSelect, type Modules } from '@/utils/system'
import { getModules } from '@/api/system'
import { shallowRef } from 'vue'
import TreeTable from './TreeTable.vue'

// 查询
const onSearch = () => { }

// 搜索栏
const queryList = shallowRef({})
const searchConfig = [
    { name: 'input', prop: 'test2', attr: { placeholder: '关键字' } },
    { name: 'button', text: '查询', attr: { type: 'primary' }, on: { click: onSearch } },
    { name: 'button', text: '添加', attr: { type: 'primary' }, on: { click: onSearch } },
    { name: 'button', text: '编辑', attr: { type: 'primary' }, on: { click: onSearch } },
    { name: 'button', text: '删除', attr: { type: 'primary' }, on: { click: onSearch } },
    { name: 'button', text: '查看角色权限', attr: { type: 'primary' }, on: { click: onSearch } },
    { name: 'button', text: '模块字段管理', attr: { type: 'primary' }, on: { click: onSearch } },
]

// 获取模块管理菜单数据
const modulesTree = shallowRef<Modules[]>([])
getModulesTree()
function getModulesTree() {
    getModules().then(response => {
        const modules = response.result.map(function (item: Modules) {
            return {
                sortNo: item.sortNo,
                id: item.id,
                name: item.name,
                iconName: item.iconName,
                parentId: item.parentId || null,
                code: item.code,
                url: item.url,
                cascadeId: item.cascadeId,
                isSys: item.isSys
            }
        })
        const modulesTmp = JSON.parse(JSON.stringify(modules))
        modulesTree.value = listToTreeSelect(modulesTmp).sort((a, b) => a.sortNo - b.sortNo)
        console.log('this.modulesTree', modulesTree)
    })
}

</script>
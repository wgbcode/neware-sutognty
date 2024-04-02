<template>
    <div class="wrapper c-flex">
        <Aside class="aside" :isSystem="true" />
        <div class="c-flex-1 c-p10">我是系统设置页</div>
    </div>
</template>

<script setup lang="tsx">
import Aside from '@/views/layout/Aside.vue';
</script>

<style lang="scss" scoped>
.wrapper {
    padding: 0 !important;

    .aside {
        width: 180px;
        background-color: var(--tc-common-40);
        margin-left: -20px;

        :deep(.el-menu) {
            background-color: var(--tc-common-40);

        }

        :deep(.el-row) {
            height: 100%;
        }

        :deep(.c-forbidSelect) {
            width: 180px
        }

        :deep(.el-sub-menu__title:hover),
        :deep(.el-menu-item:hover) {
            background-color: var(--tc-table-select-hover)
        }
    }
}
</style>

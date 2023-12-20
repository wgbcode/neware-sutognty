<template>
    <el-input @keyup.enter="on && on.keyup" />
</template>

<script setup lang="ts">
defineProps(['text', 'on'])
</script>
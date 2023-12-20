<template>
    <el-button @click="on && on.click"> {{ text }}</el-button>
</template>

<script setup lang="ts">
defineProps(['text', 'on'])
</script>
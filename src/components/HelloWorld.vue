<script setup lang="ts">
import jsonConfig from './mockData.json'
import Graph from '~/components/Graph/Graph.vue'
</script>

<template>
  <Graph :nodes="jsonConfig" :animated="true" />
</template>

<style scoped>
.read-the-docs {
  color: #888;
}
</style>~/utils/jsonToNodes

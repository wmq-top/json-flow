<script setup lang="ts">
import { ref } from 'vue'
import Graph from '~/components/Graph/Graph.vue'

const nodes = ref([
  { id: '1', type: 'transverse', label: 'Node 1', position: { x: 250, y: 5 }, isStartNode: true, selectable: true },
  { id: '2', type: 'transverse', label: 'Node 2', position: { x: 300, y: 100 }, selectable: true },
  { id: '3', type: 'transverse', label: 'Node 3', position: { x: 300, y: 200 }, selectable: true },
  { id: '4', type: 'transverse', label: 'Node 4', position: { x: 400, y: 100 }, isEndNode: true, selectable: true },
])
const edges = ref([
  { id: 'e1-2', source: '1', target: '2', animated: true },
  { id: 'e1-3', source: '1', target: '3', animated: true },
  { id: 'e3-4', source: '3', target: '4', animated: true },
])
</script>

<template>
  <Graph :nodes="nodes" :edges="edges" />
</template>

<style scoped>
.read-the-docs {
  color: #888;
}
</style>

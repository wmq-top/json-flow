<script setup lang="ts">
import { Handle, Position } from '@vue-flow/core'

defineProps(['nodeProps', 'styleConfig'])
</script>

<template>
  <Handle v-if="!nodeProps.data.isStartNode" type="target" :position="Position.Left" />
  <div class="transverse-node-item" :style="styleConfig">
    {{ nodeProps.id }}
  </div>
  <Handle v-if="!nodeProps.data.isEndNode" type="source" :position="Position.Right" />
</template>

<style lang="less" scoped>
.transverse-node-item {
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  border: 2px solid black;
}
</style>

<script setup lang="ts">
import { Handle, Position } from '@vue-flow/core'

defineProps(['nodeProps', 'startPointId', 'endPointId'])
</script>

<template>
  <Handle v-if="startPointId !== nodeProps.id" type="target" :position="Position.Left" />
  <div class="transverse-node-item">
    {{ nodeProps.label }}
  </div>
  <Handle v-if="endPointId !== nodeProps.id" type="source" :position="Position.Right" />
</template>

<style lang="less" scoped>
.transverse-node-item {
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  border: 2px solid black;
}
</style>

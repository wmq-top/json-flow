<script setup lang="ts">
import { VueFlow } from '@vue-flow/core'
import { Background } from '@vue-flow/background'
import { ref, toRefs, watch } from 'vue'
import type { EdgeType, NodeType } from './graph-type'
import TransverseNode from '~/components/Graph/TransverseNode.vue'

const props = withDefaults(defineProps<{
  width?: string | number
  height?: string | number
  nodes?: NodeType[]
  edges?: EdgeType[]
  zoomConfig?: {
    defaultZoom?: number
    maxZoom?: number
    minZoom?: number
  }
}>(), {
  width: '100%',
  height: '100%',
  nodes: () => [] as NodeType[],
  edges: () => [] as EdgeType[],
  zoomConfig: () => ({
    defaultZoom: 1,
    maxZoom: 3,
    minZoom: 0.5,
  }),
})

const { nodes, edges, zoomConfig } = toRefs(props)

const startPointId = ref<string | null>(null)
const endPointId = ref<string | null>(null)

watch(() => nodes.value, () => {
  startPointId.value = nodes.value.find(i => i.isStartNode)?.id || null
  endPointId.value = nodes.value.find(i => i.isEndNode)?.id || null
}, {
  deep: true,
  immediate: true,
})
</script>

<template>
  <!-- eslint-disable vue/no-extra-parens -->
  <div class="graph-content-wrap" :style="{ width, height }">
    <VueFlow
      :nodes="(nodes as any)"
      :edges="edges"
      selection-key-code="1"
      :default-viewport="{ zoom: zoomConfig.defaultZoom }"
      :max-zoom="zoomConfig.maxZoom"
      :min-zoom="zoomConfig.minZoom"
    >
      <Background />
      <template #node-transverse="nodeProps">
        <TransverseNode :node-props="nodeProps" :start-point-id="startPointId" :end-point-id="endPointId" />
      </template>
    </VueFlow>
  </div>
</template>

<style lang="less">
.selected {
  .transverse-node-item {
    border-color: rgb(98, 96, 255);
  }
}
.graph-content-wrap {
  width: 100%;
  height: 100%;
}
</style>

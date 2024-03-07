<script setup lang="ts">
import { VueFlow } from '@vue-flow/core'
import { Background } from '@vue-flow/background'
import { ref, toRefs } from 'vue'
import type { EdgeType, JsonArrayType, NodeItemConfig, NodeType } from './graph-type'
import TransverseNode from '~/components/Graph/TransverseNode.vue'
import { generateEdges, generatePosition, jsonToNodes } from '~/utils/jsonToNodes'

interface PropsType<T extends boolean> {
  needTransFormNodes?: T
  width?: string | number
  height?: string | number
  nodes?: T extends true ? JsonArrayType[] : NodeType[]
  edges?: EdgeType[]
  animated?: boolean
  zoomConfig?: {
    defaultZoom?: number
    maxZoom?: number
    minZoom?: number
  }
  nodeItemConfig?: NodeItemConfig
}
const props = withDefaults(defineProps<PropsType<true> | PropsType<false>>(), {
  needTransFormNodes: true,
  width: '100%',
  height: '100%',
  nodes: () => [],
  edges: () => [],
  animated: false,
  zoomConfig: () => ({
    defaultZoom: 1,
    maxZoom: 3,
    minZoom: 0.5,
  }),
  nodeItemConfig: () => ({
    gap: 64,
    x: 100,
    y: 100,
    height: 100,
    width: 160,
  }),
})

const { nodes, zoomConfig, nodeItemConfig, animated, needTransFormNodes } = toRefs(props)

const nodesList = ref(needTransFormNodes.value
  ? generatePosition(jsonToNodes(nodes.value), nodeItemConfig.value)
  : generatePosition(nodes.value as NodeType[], nodeItemConfig.value))
const edgesList = ref(generateEdges(nodesList.value, animated.value))
</script>

<template>
  <!-- eslint-disable vue/no-extra-parens -->
  <div class="graph-content-wrap" :style="{ width, height }">
    <VueFlow
      :nodes="(nodesList as any)"
      :edges="edgesList"
      selection-key-code="1"
      :default-viewport="{ zoom: zoomConfig.defaultZoom }"
      :max-zoom="zoomConfig.maxZoom"
      :min-zoom="zoomConfig.minZoom"
    >
      <Background />
      <template #node-transverse="nodeProps">
        <TransverseNode
          :node-props="nodeProps"
          :style-config="{ maxWidth: `${nodeItemConfig.width}px`, maxHeight: `${nodeItemConfig.height}px` }"
        />
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

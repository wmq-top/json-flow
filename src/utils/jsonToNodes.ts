import type { EdgeType, JsonArrayType, NodeItemConfig, NodeType } from '~/components/Graph/graph-type'

function jsonToNodes(jsonArray: JsonArrayType[]) {
  let result: NodeType[] = []

  try {
    result = flatArrayToNodes(jsonArray).sort((a, b) => {
      return a.level - b.level
    })
    return result
  }
  catch (e) {
    console.error('jsonToNodes need a resolvable json string but get an invalidated value')
    return result
  }
}

function flatArrayToNodes(sourceData: JsonArrayType[]) {
  const result: NodeType[] = []

  const dfs = (data: JsonArrayType[], parent: string | undefined, level = 0) => {
    data.forEach((i, index: number) => {
      const currentNode = {
        id: i.id,
        type: 'transverse',
        isStartNode: i.isStartNode ?? !parent,
        isEndNode: i.isEndNode ?? !!((!i.children || i.children.length === 0 || !Array.isArray(i.children))),
        level: i.level ?? level,
        parentId: i.parentId ?? parent,
      }
      result.push({
        ...currentNode,
        data: { ...i, ...currentNode, key: `${level}-${index}` },
      })
      if (i.children && i.children.length !== 0 && Array.isArray(i.children))
        dfs(i.children, i.id, level + 1)
    })
  }
  dfs(sourceData, undefined, 0)
  return result
}

function generatePosition(sourceData: NodeType[], nodeItemConfig: NodeItemConfig): NodeType[] {
  const sourceIndexArr = new Array(sourceData[sourceData.length - 1].level + 1).fill(0)
  return sourceData.map((item) => {
    const x = nodeItemConfig.x + (item.level * (nodeItemConfig.gap + nodeItemConfig.width))
    const y = nodeItemConfig.y + (sourceIndexArr[item.level] * (nodeItemConfig.gap + nodeItemConfig.height))
    sourceIndexArr[item.level] = sourceIndexArr[item.level] + 1
    return { ...item, position: { x, y } }
  })
}
function generateEdges(sourceData: NodeType[], animated: boolean) {
  const result: EdgeType[] = []

  sourceData.forEach((item) => {
    if (item.parentId)
      result.push({ id: `${item.parentId}--${item.id}`, source: item.parentId, target: item.id, animated })
  })

  return result
}
export { jsonToNodes, generatePosition, generateEdges }

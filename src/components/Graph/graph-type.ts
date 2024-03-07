// 位置信息
interface Pos { x: number; y: number }

// 当前节点的类型定义
interface NodeType {
  id: string
  level: number
  type?: string
  label?: string
  position?: Pos
  isStartNode?: boolean
  isEndNode?: boolean
  data?: any
  parentId?: string
}

interface EdgeType {
  id: string
  source: string
  target: string
  animated?: boolean
}
interface NodeItemConfig {
  gap: number
  x: number
  y: number
  height: number
  width: number
}

type JsonArrayType = {
  id: string
  children: JsonArrayType[]
} | {
  [key in string]: any
}
export type { NodeType, EdgeType, NodeItemConfig, JsonArrayType }

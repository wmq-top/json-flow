// 位置信息
interface Pos { x: number; y: number }

// 当前节点的类型定义
interface NodeType {
  id: string
  type?: string
  label?: string
  position?: Pos
  isStartNode?: boolean
  isEndNode?: boolean
}

interface EdgeType {
  id: string
  source: string
  target: string
}
export type { NodeType, EdgeType }

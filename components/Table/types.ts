import { SortOrder } from '@/types'

type SortableColumn = {
  isSortable: true
  sortOrder: SortOrder | null
  onSort: () => void
}

type UnsortableColumn = {
  isSortable?: false
}

type ColumnWithCell = {
  key?: never
  cell: (row: any) => React.ReactNode
}

type ColumnWithKey = {
  key: string
  cell?: never
}

export type Column = {
  name: string
} & (ColumnWithCell | ColumnWithKey) &
  (SortableColumn | UnsortableColumn)

export type Props = {
  title: string
  rowKey: string
  columns: Column[]
  data: Array<{ [key: string]: string | number }>
  headerSlot?: React.ReactNode
  isLoading?: boolean
}

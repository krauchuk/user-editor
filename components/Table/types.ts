type SortableColumn = {
  isSortable: true
  onSort: (order: 'asc' | 'desc') => void
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
  columns: Column[]
  data: Array<{ [key: string]: string | number }>
  headerSlot?: React.ReactNode
}

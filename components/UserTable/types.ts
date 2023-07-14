import { User } from '@/types'
import { Sort } from '@/store/users/slice'

export type Props = {
  data: User[]
  sortData: Sort
  loading: boolean
  onAddClick: () => void
  onRefreshClick: () => void
  onEditClick: (row: User) => void
  onDeleteClick: (row: User) => void
}

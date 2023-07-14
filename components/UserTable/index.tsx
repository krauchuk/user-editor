import { useMemo } from 'react'

import Button from '../Button'
import Table from '../Table'
import { useAppDispatch } from '@/store/hooks'
import { sortUsers } from '@/store/users/slice'
import { Column } from '../Table/types'
import { User } from '@/types'
import { Props } from './types'
import { TableButtons } from './styles'
import RefreshIcon from '@/icons/RefreshIcon'

const UserTable = ({ data, sortData, loading, onAddClick, onRefreshClick, onEditClick, onDeleteClick }: Props) => {
  const dispatch = useAppDispatch()

  const columns: Column[] = useMemo(
    () => [
      {
        name: 'Id',
        key: 'id',
        isSortable: true,
        sortOrder: sortData.field === 'id' ? sortData.order : null,
        onSort: () => dispatch(sortUsers({ field: 'id' })),
      },
      {
        name: 'Name',
        key: 'name',
        isSortable: true,
        sortOrder: sortData.field === 'name' ? sortData.order : null,
        onSort: () => dispatch(sortUsers({ field: 'name' })),
      },
      {
        name: 'Username',
        key: 'username',
        isSortable: true,
        sortOrder: sortData.field === 'username' ? sortData.order : null,
        onSort: () => dispatch(sortUsers({ field: 'username' })),
      },
      { name: 'Email', key: 'email' },
      {
        name: 'City',
        key: 'city',
        isSortable: true,
        sortOrder: sortData.field === 'city' ? sortData.order : null,
        onSort: () => dispatch(sortUsers({ field: 'city' })),
      },
      {
        name: 'Edit',
        cell: (row: User) => <Button text="edit" variant="warning" onClick={() => onEditClick(row)} />,
      },
      {
        name: 'Delete',
        cell: (row: User) => <Button text="delete" variant="danger" onClick={() => onDeleteClick(row)} />,
      },
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [sortData],
  )

  return (
    <Table
      title="User List"
      rowKey="id"
      columns={columns}
      data={data}
      headerSlot={
        <TableButtons>
          <Button text="Add new" onClick={onAddClick} />
          <Button variant="secondary" onClick={onRefreshClick}>
            <RefreshIcon />
          </Button>
        </TableButtons>
      }
      isLoading={loading}
    />
  )
}

export default UserTable

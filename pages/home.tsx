import { useEffect } from 'react'

import PageLayout from '@/components/PageLayout'
import Table from '@/components/Table'
import Button from '@/components/Button'
import { Column } from '@/components/Table/types'
import { getUsers } from '@/store/users/allUsers/actions'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { getAllUsers } from '@/store/users/allUsers/selectors'
import { User } from '@/types'

const columns: Column[] = [
  { name: 'Id', key: 'id' },
  { name: 'Name', key: 'name' },
  {
    name: 'Username',
    key: 'username',
    isSortable: true,
    onSort: order => {},
  },
  { name: 'Email', key: 'email' },
  { name: 'City', key: 'city' },
  {
    name: 'Edit',
    cell: (row: User) => (
      <>
        <Button
          text="edit"
          variant="warning"
          onClick={() => {
            alert(row.id)
          }}
        />
      </>
    ),
  },
  {
    name: 'Delete',
    cell: (row: User) => (
      <Button
        text="delete"
        variant="danger"
        onClick={() => {
          alert(row.id)
        }}
      />
    ),
  },
]

export default function HomePage() {
  const dispatch = useAppDispatch()
  const { data: allUsers, loading } = useAppSelector(getAllUsers)

  useEffect(() => {
    dispatch(getUsers())
  }, [dispatch])

  if (loading) {
    return <div>Loading</div>
  }

  return (
    <PageLayout>
      <Table title="User List" columns={columns} data={allUsers} />
    </PageLayout>
  )
}

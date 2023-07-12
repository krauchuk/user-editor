import { useEffect, useMemo } from 'react'
import { useRouter } from 'next/router'

import PageLayout from '@/components/PageLayout'
import Table from '@/components/Table'
import Button from '@/components/Button'
import { Column } from '@/components/Table/types'
import { fetchAllUsers } from '@/store/users/allUsers/actions'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { getAllUsers } from '@/store/users/allUsers/selectors'
import { User } from '@/types'

export default function HomePage() {
  const router = useRouter()
  const dispatch = useAppDispatch()
  const { data: allUsers, loading } = useAppSelector(getAllUsers)

  const columns: Column[] = useMemo(
    () => [
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
                router.push(`/edit/${row.id}`)
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
    ],
    [router],
  )

  useEffect(() => {
    dispatch(fetchAllUsers())
  }, [dispatch])

  if (loading) {
    return <div>Loading</div>
  }

  return (
    <PageLayout>
      <Table
        title="User List"
        columns={columns}
        data={allUsers}
        headerSlot={<Button text="Add new" onClick={() => router.push('/add')} />}
      />
    </PageLayout>
  )
}

import { useEffect, useMemo } from 'react'
import { useRouter } from 'next/router'

import PageLayout from '@/components/PageLayout'
import Table from '@/components/Table'
import Button from '@/components/Button'
import { Column } from '@/components/Table/types'
import Modal from '@/components/Modal'
import { fetchAllUsers } from '@/store/users/allUsers/actions'
import { getAllUsers } from '@/store/users/allUsers/selectors'
import { sortUsers } from '@/store/users/allUsers/slice'
import { deleteUser } from '@/store/users/selectedUser/actions'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import useModal from '@/hooks/useModal'
import { User, SortOrder } from '@/types'

export default function HomePage() {
  const router = useRouter()
  const dispatch = useAppDispatch()
  const { data: allUsers, sort } = useAppSelector(getAllUsers)
  const deleteModal = useModal({ name: 'deleteModal', metadata: { userId: 0, name: '' } })

  const columns: Column[] = useMemo(
    () => [
      { name: 'Id', key: 'id' },
      { name: 'Name', key: 'name' },
      {
        name: 'Username',
        key: 'username',
        isSortable: true,
        sortOrder: sort.field === 'username' ? sort.order : null,
        onSort: () => {
          dispatch(sortUsers({ field: 'username', order: sort.order === 'asc' ? 'desc' : 'asc' }))
        },
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
              deleteModal.setVisibility(true, { userId: row.id, name: row.name })
            }}
          />
        ),
      },
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [sort],
  )

  const handleDeleteBtn = () => {
    dispatch(deleteUser(deleteModal.metadata.userId))
    dispatch(fetchAllUsers())
    deleteModal.setVisibility(false)
  }

  useEffect(() => {
    dispatch(fetchAllUsers())
  }, [dispatch])

  return (
    <PageLayout>
      <Modal
        title="Delete"
        isVisible={deleteModal.isVisible}
        footerSlot={
          <div>
            <Button text="Cancel" variant="secondary" onClick={() => deleteModal.setVisibility(false)} />
            <Button text="Delete" variant="danger" onClick={handleDeleteBtn} />
          </div>
        }
      >
        <span>Do you want to delete user: {deleteModal.metadata.name}?</span>
      </Modal>
      <Table
        title="User List"
        rowKey="id"
        columns={columns}
        data={allUsers}
        headerSlot={<Button text="Add new" onClick={() => router.push('/add')} />}
      />
    </PageLayout>
  )
}

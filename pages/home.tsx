import { useMemo, useLayoutEffect } from 'react'
import { useRouter } from 'next/router'

import AlertBanner from '@/components/AlertBanner'
import PageLayout from '@/components/PageLayout'
import Table from '@/components/Table'
import Button from '@/components/Button'
import { Column } from '@/components/Table/types'
import Modal from '@/components/Modal'
import { fetchAllUsers } from '@/store/users/allUsers/actions'
import { getAllUsers } from '@/store/users/allUsers/selectors'
import { deleteUser } from '@/store/users/selectedUser/actions'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { getUser } from '@/store/users/selectedUser/selectors'
import useModal from '@/hooks/useModal'
import { User } from '@/types'
import { ModalButtons, TableButtons } from '@/styles/pages/homePage'
import { resetError as resetDeletionError } from '@/store/users/selectedUser/slice'
import { setPageAlert } from '@/store/app/slice'
import { sortUsers } from '@/store/users/allUsers/slice'
import RefreshIcon from '@/icons/RefreshIcon'

export default function HomePage() {
  const router = useRouter()
  const dispatch = useAppDispatch()
  const { data: allUsers, sort, loading, error: fetchError } = useAppSelector(getAllUsers)
  const { loading: currentUserLoading, error: deletionError } = useAppSelector(getUser)
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

  const handleRefreshBtn = () => {
    dispatch(fetchAllUsers())
  }

  const handleDeleteBtn = async () => {
    try {
      await dispatch(deleteUser(deleteModal.metadata.userId)).unwrap()

      dispatch(fetchAllUsers())
      deleteModal.setVisibility(false)
      dispatch(
        setPageAlert({ type: 'success', text: `User [${deleteModal.metadata.name}] has been successfully deleted` }),
      )
    } catch (e) {}
  }

  const handleCloseBtn = () => {
    deleteModal.setVisibility(false)
    dispatch(resetDeletionError())
  }

  useLayoutEffect(() => {
    if (!allUsers.length) dispatch(fetchAllUsers())
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch])

  return (
    <PageLayout>
      <Modal
        title="Delete"
        isVisible={deleteModal.isVisible}
        footerSlot={
          <ModalButtons>
            <Button text="Cancel" variant="secondary" onClick={handleCloseBtn} />
            <Button text="Delete" variant="danger" isDisabled={currentUserLoading} onClick={handleDeleteBtn} />
          </ModalButtons>
        }
      >
        {deletionError && <AlertBanner text={deletionError} type="danger" />}
        <span>Do you want to delete user: {deleteModal.metadata.name}?</span>
      </Modal>
      {fetchError && <AlertBanner text={fetchError} type="danger" />}
      <Table
        title="User List"
        rowKey="id"
        columns={columns}
        data={allUsers}
        headerSlot={
          <TableButtons>
            <Button text="Add new" onClick={() => router.push('/add')} />
            <Button variant="secondary" onClick={handleRefreshBtn}>
              <RefreshIcon />
            </Button>
          </TableButtons>
        }
        isLoading={loading}
      />
    </PageLayout>
  )
}

import { useLayoutEffect } from 'react'
import { useRouter } from 'next/router'

import AlertBanner from '@/components/AlertBanner'
import PageLayout from '@/components/PageLayout'
import Button from '@/components/Button'
import Modal from '@/components/Modal'
import { fetchAllUsers } from '@/store/users/actions'
import { selectUsers } from '@/store/users/selectors'
import { deleteUser } from '@/store/user/actions'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { selectUser } from '@/store/user/selectors'
import useModal from '@/hooks/useModal'
import { ModalButtons } from '@/styles/pages/homePage'
import { resetError as resetDeletionError } from '@/store/user/slice'
import { setPageAlert } from '@/store/app/slice'
import UserTable from '@/components/UserTable'

export default function HomePage() {
  const router = useRouter()
  const dispatch = useAppDispatch()
  const { users, sort, loading, error: fetchError } = useAppSelector(selectUsers)
  const deletionInfo = useAppSelector(selectUser)
  const deleteModal = useModal({ name: 'deleteModal', metadata: { userId: 0, name: '' } })

  const handleDeleteBtn = async () => {
    try {
      await dispatch(deleteUser(deleteModal.metadata.userId)).unwrap()

      dispatch(fetchAllUsers())
      deleteModal.setVisibility(false)
      dispatch(
        setPageAlert({ type: 'success', text: `User [${deleteModal.metadata.name}] has been successfully deleted` }),
      )
    } catch (e) {
      // TODO: add logger
      const message = e instanceof Error ? e.message : 'Something went wrong when deleting the user'
      console.error(message)
    }
  }

  const handleCloseBtn = () => {
    deleteModal.setVisibility(false)
    dispatch(resetDeletionError())
  }

  useLayoutEffect(() => {
    if (!users.length) dispatch(fetchAllUsers())
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch])

  return (
    <PageLayout>
      <Modal
        title="Delete"
        isOpen={deleteModal.isOpen}
        footerSlot={
          <ModalButtons>
            <Button text="Cancel" variant="secondary" onClick={handleCloseBtn} />
            <Button text="Delete" variant="danger" isDisabled={deletionInfo.loading} onClick={handleDeleteBtn} />
          </ModalButtons>
        }
      >
        {deletionInfo.error && <AlertBanner text={deletionInfo.error} type="danger" />}
        <span>Do you want to delete user: {deleteModal.metadata.name}?</span>
      </Modal>
      {fetchError && <AlertBanner text={fetchError} type="danger" />}
      <UserTable
        data={users}
        sortData={sort}
        loading={loading}
        onAddClick={() => router.push('/add')}
        onRefreshClick={() => dispatch(fetchAllUsers())}
        onDeleteClick={row => deleteModal.setVisibility(true, { userId: row.id, name: row.name })}
        onEditClick={row => router.push(`/edit/${row.id}`)}
      />
    </PageLayout>
  )
}

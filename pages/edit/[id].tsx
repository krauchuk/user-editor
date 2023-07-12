import { useEffect } from 'react'
import { useRouter } from 'next/router'

import PageLayout from '@/components/PageLayout'
import UserForm from '@/components/UserForm'
import { fetchUser } from '@/store/users/selectedUser/actions'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { fetchAllUsers } from '@/store/users/allUsers/actions'
import { getAllUsers } from '@/store/users/allUsers/selectors'

export default function EditUserPage() {
  const dispatch = useAppDispatch()
  const router = useRouter()
  const { id } = router.query
  const { data: allUsers, loading } = useAppSelector(getAllUsers)

  useEffect(() => {
    if (!loading && !allUsers.length) dispatch(fetchAllUsers())
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch])

  useEffect(() => {
    if (id && !isNaN(+id)) dispatch(fetchUser(+id))
  }, [dispatch, id])

  return (
    <PageLayout>
      <UserForm isEditMode />
    </PageLayout>
  )
}

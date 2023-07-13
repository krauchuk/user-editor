import { useEffect } from 'react'

import PageLayout from '@/components/PageLayout'
import UserForm from '@/components/UserForm'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { getAllUsers } from '@/store/users/allUsers/selectors'
import { fetchAllUsers } from '@/store/users/allUsers/actions'

export default function AddUserPage() {
  const dispatch = useAppDispatch()
  const { data: allUsers, loading } = useAppSelector(getAllUsers)

  useEffect(() => {
    if (!loading && !allUsers.length) dispatch(fetchAllUsers())
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch])

  return (
    <PageLayout>
      <UserForm />
    </PageLayout>
  )
}

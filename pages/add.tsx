import { useLayoutEffect } from 'react'

import ErrorBanner from '@/components/ErrorBanner'
import PageLayout from '@/components/PageLayout'
import UserForm from '@/components/UserForm'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { getUser } from '@/store/users/selectedUser/selectors'
import { resetError } from '@/store/users/selectedUser/slice'

export default function AddUserPage() {
  const dispatch = useAppDispatch()
  const { error } = useAppSelector(getUser)

  useLayoutEffect(() => {
    dispatch(resetError())
  }, [dispatch])

  return (
    <PageLayout>
      {error && <ErrorBanner text={error} />}
      <UserForm />
    </PageLayout>
  )
}

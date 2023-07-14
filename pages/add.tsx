import { useLayoutEffect } from 'react'

import ErrorBanner from '@/components/AlertBanner'
import PageLayout from '@/components/PageLayout'
import UserForm from '@/components/UserForm'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { selectUserError } from '@/store/user/selectors'
import { resetError } from '@/store/user/slice'

export default function AddUserPage() {
  const dispatch = useAppDispatch()
  const error = useAppSelector(selectUserError)

  useLayoutEffect(() => {
    dispatch(resetError())

    return () => {
      dispatch(resetError())
    }
  }, [dispatch])

  return (
    <PageLayout>
      <UserForm />
      {error && <ErrorBanner text={error} type="danger" />}
    </PageLayout>
  )
}

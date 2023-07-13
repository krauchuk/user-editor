import { useEffect, useLayoutEffect } from 'react'
import { useRouter } from 'next/router'

import ErrorBanner from '@/components/AlertBanner'
import PageLayout from '@/components/PageLayout'
import UserForm from '@/components/UserForm'
import { fetchUser } from '@/store/users/selectedUser/actions'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { getUser } from '@/store/users/selectedUser/selectors'
import { resetError } from '@/store/users/selectedUser/slice'

export default function EditUserPage() {
  const dispatch = useAppDispatch()
  const router = useRouter()
  const { id } = router.query
  const { error } = useAppSelector(getUser)

  useLayoutEffect(() => {
    dispatch(resetError())

    return () => {
      dispatch(resetError())
    }
  }, [dispatch])

  useEffect(() => {
    if (id && !isNaN(+id)) dispatch(fetchUser(+id))
  }, [dispatch, id])

  return (
    <PageLayout>
      <UserForm isEditMode />
      {error && <ErrorBanner text={error} type="danger" />}
    </PageLayout>
  )
}

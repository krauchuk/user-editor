import { useEffect, useLayoutEffect } from 'react'
import { useRouter } from 'next/router'

import ErrorBanner from '@/components/AlertBanner'
import PageLayout from '@/components/PageLayout'
import UserForm from '@/components/UserForm'
import { fetchUser } from '@/store/user/actions'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { selectUserError } from '@/store/user/selectors'
import { resetError } from '@/store/user/slice'

export default function EditUserPage() {
  const dispatch = useAppDispatch()
  const router = useRouter()
  const { id } = router.query
  const error = useAppSelector(selectUserError)

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

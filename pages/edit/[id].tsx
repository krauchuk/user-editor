import { useEffect } from 'react'
import { useRouter } from 'next/router'

import PageLayout from '@/components/PageLayout'
import { getUser } from '@/store/users/selectedUser/actions'
import { useAppDispatch } from '@/store/hooks'

export default function EditUserPage() {
  const dispatch = useAppDispatch()
  const router = useRouter()
  const { id } = router.query

  useEffect(() => {
    if (id && !isNaN(+id)) {
      dispatch(getUser(+id))
    }
  }, [dispatch, id])

  return <PageLayout>Edit {id}</PageLayout>
}

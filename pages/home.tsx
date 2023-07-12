import { useEffect } from 'react'

import PageLayout from '@/components/PageLayout'
import { getUsers } from '@/store/users/allUsers/actions'

export default function HomePage() {
  useEffect(() => {
    getUsers()
  }, [])

  return <PageLayout>123</PageLayout>
}

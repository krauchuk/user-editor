import { useLayoutEffect, useEffect } from 'react'

import Header from '../Header'
import { Props } from './types'
import { Main } from './styles'
import AlertBanner from '../AlertBanner'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { selectPageAlert } from '@/store/app/selectors'
import { resetPageAlert } from '@/store/app/slice'

const Layout = ({ children }: Props) => {
  const dispatch = useAppDispatch()
  const pageAlert = useAppSelector(selectPageAlert)

  useLayoutEffect(() => {
    dispatch(resetPageAlert())
  }, [dispatch])

  useEffect(() => {
    if (pageAlert.type == 'success') {
      setTimeout(() => {
        dispatch(resetPageAlert())
      }, 4000)
    }
  }, [dispatch, pageAlert])

  return (
    <>
      <Header />
      {pageAlert.type && <AlertBanner text={pageAlert.text} type={pageAlert.type} />}
      <Main>{children}</Main>
    </>
  )
}

export default Layout

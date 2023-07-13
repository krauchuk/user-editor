import Header from '../Header'

import { Props } from './types'
import { Main } from './styles'

const Layout = ({ children }: Props) => (
  <>
    <Header />
    <Main>{children}</Main>
  </>
)

export default Layout

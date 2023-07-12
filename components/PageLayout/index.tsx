import Header from '../Header'

import { Props } from './types'

const Layout = ({ children }: Props) => (
  <>
    <Header />
    <main>{children}</main>
  </>
)

export default Layout

import Link from 'next/link'

import { Header } from './styles'

const CustomHeader = () => (
  <Header>
    <nav>
      <Link href="/home">Home</Link>
    </nav>
  </Header>
)

export default CustomHeader

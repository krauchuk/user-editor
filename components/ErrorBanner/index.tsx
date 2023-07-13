import { Props } from './types'
import { Banner, Header, Text } from './styles'

const ErrorBanner = ({ text }: Props) => (
  <Banner>
    <Header>Error!</Header>
    <Text>{text}</Text>
  </Banner>
)

export default ErrorBanner

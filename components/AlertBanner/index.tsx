import { Props } from './types'
import { Banner, Header, Text } from './styles'
import { AlertType } from '@/types'

const headerText: Record<AlertType, string> = {
  danger: 'Error!',
  success: 'Success!',
}

const AlertBanner = ({ text, type }: Props) => (
  <Banner type={type}>
    <Header>{headerText[type]}</Header>
    {text && <Text>{text}</Text>}
  </Banner>
)

export default AlertBanner

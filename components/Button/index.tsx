import { Props } from './types'
import { Button } from './styles'

const CustomButton = ({
  text = 'Click',
  type = 'button',
  variantType = 'regular',
  variant = 'primary',
  isDisabled,
  children,
  onClick,
}: Props) => (
  <Button type={type} onClick={onClick} disabled={isDisabled} variantType={variantType} variant={variant}>
    {children || text}
  </Button>
)

export default CustomButton

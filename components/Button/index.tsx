import { Props } from './types'
import { Button } from './styles'

const CustomButton = ({
  text,
  type = 'button',
  variantType = 'regular',
  variant = 'primary',
  isDisabled,
  onClick,
}: Props) => (
  <Button type={type} onClick={onClick} disabled={isDisabled} variantType={variantType} variant={variant}>
    {text}
  </Button>
)

export default CustomButton

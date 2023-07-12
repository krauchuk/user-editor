import { Props } from './types'

const Button = ({
  text,
  type = 'button',
  variantType = 'regular',
  variant = 'primary',
  isDisabled,
  onClick,
}: Props) => {
  return (
    <button type={type} onClick={onClick} disabled={isDisabled}>
      {text}
    </button>
  )
}

export default Button

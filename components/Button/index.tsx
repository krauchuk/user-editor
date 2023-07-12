import { Props } from './types'

const Button = ({ text, type = 'regular', variant = 'primary', onClick }: Props) => {
  return <button onClick={onClick}>{text}</button>
}

export default Button

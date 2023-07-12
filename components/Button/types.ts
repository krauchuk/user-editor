export type Props = {
  text: string
  type?: 'button' | 'submit' | 'reset'
  variantType?: 'regular' | 'outline'
  variant?: 'primary' | 'secondary' | 'success' | 'danger' | 'warning'
  isDisabled?: boolean
  onClick?: () => void
}

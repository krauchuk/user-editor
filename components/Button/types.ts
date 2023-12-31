import { Colors } from '@/styles/colors'

export type BtnVariant = keyof typeof Colors

export type BtnVariantType = 'regular' | 'outline'

export type Props = {
  text?: string
  type?: 'button' | 'submit' | 'reset'
  variantType?: BtnVariantType
  variant?: BtnVariant
  children?: React.ReactNode
  isDisabled?: boolean
  onClick?: () => void
}

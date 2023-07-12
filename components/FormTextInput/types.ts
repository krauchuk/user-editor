import { FieldError } from 'react-hook-form/dist/types/errors'

export type Props = {
  label: string
  error?: FieldError
  isDisabled?: boolean
}

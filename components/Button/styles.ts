import styled from '@emotion/styled'

import { BtnVariant, BtnVariantType } from './types'
import { Colors } from '@/styles/colors'

type ButtonProps = {
  variant: BtnVariant
  variantType: BtnVariantType
}

export const Button = styled('button')<ButtonProps>`
  cursor: pointer;
  padding: 0.25rem 1rem;
  color: ${props => (props.variantType === 'outline' ? Colors[props.variant] : 'white')};
  border: 1px solid;
  border-color: ${props => Colors[props.variant]};
  background: ${props => (props.variantType === 'outline' ? 'white' : Colors[props.variant])};
  border-radius: 0.25rem;

  :hover:not([disabled]) {
    background: ${props => (props.variantType === 'outline' ? Colors[props.variant] : 'white')};
    color: ${props => (props.variantType === 'outline' ? 'white' : Colors[props.variant])};
  }

  :disabled {
    cursor: auto;
    opacity: 0.35;
  }
`

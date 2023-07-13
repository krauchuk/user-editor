import styled from '@emotion/styled'

import { Colors } from '@/styles/colors'
import { styleConst } from '@/styles/const'

type InputProps = {
  isValid: boolean
}

export const Container = styled('div')`
  display: flex;
  flex-direction: column;
  position: relative;
`

export const InputWrapper = styled('div')`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 1.25rem;
`

export const Label = styled('label')`
  width: 100px;
  font-weight: 500;
`

export const Input = styled('input')<InputProps>`
  flex: 1;
  padding: 0.25rem;
  border: 1px solid;
  border-color: ${props => (props.isValid ? styleConst.borderColor : Colors.danger)};
  border-radius: ${styleConst.borderRadius};
`

export const Error = styled('span')`
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 100%;
  font-size: small;
  text-align: center;
  color: ${Colors.danger};
  line-height: 1.3rem;
`

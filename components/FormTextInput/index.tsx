import React from 'react'

import { Props } from './types'
import { Container, InputWrapper, Label, Input, Error } from './styles'

const FromTextInput = React.forwardRef<HTMLInputElement, Props>(({ label, error, isDisabled, ...rest }, ref) => (
  <Container>
    <InputWrapper>
      <Label htmlFor={`input-${label}`}>{label}</Label>
      <Input type="text" id={`input-${label}`} ref={ref} disabled={isDisabled} isValid={!error} {...rest} />
    </InputWrapper>
    {error?.message && <Error>{error.message}</Error>}
  </Container>
))

FromTextInput.displayName = 'FromTextInput'

export default FromTextInput

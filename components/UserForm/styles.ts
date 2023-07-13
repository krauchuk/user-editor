import styled from '@emotion/styled'

import { styleConst } from '@/styles/const'

export const Form = styled('form')`
  max-width: 350px;
  margin: auto;
  background: white;
  border: 1px solid ${styleConst.borderColor};
  border-radius: ${styleConst.borderRadius};

  h2 {
    border-bottom: 1px solid ${styleConst.borderColor};
    padding: 0.5rem;
  }
`

export const FormInputs = styled('div')`
  padding: 1rem;
`

export const FormButtons = styled('div')`
  padding: 1rem;
  display: flex;
  justify-content: end;
  gap: 1rem;
  border-top: 1px solid ${styleConst.borderColor};
`

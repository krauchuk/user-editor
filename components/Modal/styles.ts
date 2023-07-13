import styled from '@emotion/styled'

import { styleConst } from '@/styles/const'

export const Overlay = styled('div')`
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
`

export const Backdrop = styled('div')`
  width: 100%;
  height: 100%;
  background: black;
  opacity: 0.3;
`

export const ModalContainer = styled('div')`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: white;
  border-radius: ${styleConst.borderRadius};
  border: 1px solid ${styleConst.borderColor};
  width: 450px;

  h3 {
    border-bottom: 1px solid ${styleConst.borderColor};
    padding: 1rem;
  }
`

export const ModalBody = styled('div')`
  padding: 1rem;
`

export const ModalFooter = styled('div')`
  padding: 1rem;
  border-top: 1px solid ${styleConst.borderColor};
`

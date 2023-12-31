import { createPortal } from 'react-dom'

import { Props } from './types'
import { Overlay, ModalContainer, ModalBody, ModalFooter, Backdrop } from './styles'

const Modal = ({ title, isOpen, children, footerSlot }: Props) => {
  if (!isOpen) return null

  return (
    <>
      {createPortal(
        <Overlay>
          <Backdrop />
          <ModalContainer>
            <h3>{title}</h3>
            <ModalBody>{children}</ModalBody>
            {footerSlot && <ModalFooter>{footerSlot}</ModalFooter>}
          </ModalContainer>
        </Overlay>,
        document.body,
      )}
    </>
  )
}

export default Modal

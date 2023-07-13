import { createPortal } from 'react-dom'

import { Props } from './types'

const Modal = ({ title, isVisible, children, footerSlot }: Props) => {
  if (!isVisible) return null

  return (
    <>
      {createPortal(
        <div>
          <div>
            <h3>{title}</h3>
            <div>{children}</div>
            {footerSlot && <div>{footerSlot}</div>}
          </div>
        </div>,
        document.body,
      )}
    </>
  )
}

export default Modal

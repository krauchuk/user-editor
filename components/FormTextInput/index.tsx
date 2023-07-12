import React from 'react'

import { Props } from './types'

const FromTextInput = React.forwardRef<HTMLInputElement, Props>(({ label, error, isDisabled, ...rest }, ref) => (
  <div>
    <label htmlFor={`input-${label}`}>{label}</label>
    <input type="text" id={`input-${label}`} ref={ref} disabled={isDisabled} {...rest} />
    {error?.message && <span>{error.message}</span>}
  </div>
))

FromTextInput.displayName = 'FromTextInput'

export default FromTextInput

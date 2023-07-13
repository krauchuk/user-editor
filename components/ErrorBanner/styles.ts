import styled from '@emotion/styled'

import { Colors } from '@/styles/colors'
import { styleConst } from '@/styles/const'

export const Banner = styled('div')`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  align-items: center;
  max-width: max-content;
  margin: 1rem auto;
  border: 1px solid ${Colors.danger};
  color: ${Colors.danger};
  padding: 0.5rem;
  background: white;
  border-radius: ${styleConst.borderRadius};
`

export const Header = styled('div')`
  font-weight: bold;
`

export const Text = styled('div')`
  font-size: 0.8rem;
`

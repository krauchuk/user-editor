import styled from '@emotion/styled'

import { Colors } from '@/styles/colors'
import { styleConst } from '@/styles/const'
import { AlertType } from '@/types'

type BannerProps = {
  type: AlertType
}

export const Banner = styled('div')<BannerProps>`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  align-items: center;
  max-width: max-content;
  margin: 1rem auto;
  border: 1px solid ${props => Colors[props.type]};
  color: ${props => Colors[props.type]};
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

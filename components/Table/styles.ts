import styled from '@emotion/styled'

import { styleConst } from '@/styles/const'
import { Colors } from '@/styles/colors'
import { SortOrder } from '@/types'

type ChevronProps = {
  sortOrder: SortOrder | null
}

export const Container = styled('div')`
  margin: auto;
  background: white;
  border: 1px solid ${styleConst.borderColor};
  border-radius: ${styleConst.borderRadius};
  min-width: 50%;
  max-width: min-content;
`

export const Table = styled('table')`
  width: 100%;
  padding: 1rem;
  border-spacing: unset;

  thead {
    background: ${Colors.secondary};
    color: white;
  }

  td,
  th {
    padding: 0.5rem;
  }

  td {
    border-bottom: 1px solid ${styleConst.borderColor};
  }
`

export const TableWrapper = styled('div')`
  position: relative;
`

export const TableHeader = styled('div')`
  border-bottom: 1px solid ${styleConst.borderColor};
  display: flex;
  justify-content: space-between;
  padding: 1rem;
`

export const HeadCell = styled('div')`
  display: flex;
`

export const Chevron = styled('div')<ChevronProps>`
  display: flex;
  align-items: center;
  width: 15px;

  svg {
    height: 15px;
    width: 15px;
    transform: ${props => (props.sortOrder === 'asc' ? 'scaleY(1)' : 'scaleY(-1)')};
  }
`

export const Loader = styled('div')`
  position: absolute;
  background: black;
  opacity: 0.5;
  top: 1rem;
  bottom: 1rem;
  right: 1rem;
  left: 1rem;
`

export const LoaderText = styled('div')`
  color: white;
  font-weight: bold;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`

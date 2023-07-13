import { Props } from './types'
import { Container, Table, TableHeader, HeadCell, Chevron, TableWrapper, Loader, LoaderText } from './styles'
import ChevronDownIcon from '@/icons/ChevronDownIcon'
import MinusIcon from '@/icons/MinusIcon'

const CustomTable = ({ title, rowKey, columns, data, headerSlot, isLoading = false }: Props) => (
  <Container>
    <TableHeader>
      <h3>{title}</h3>
      <div>{headerSlot}</div>
    </TableHeader>
    <TableWrapper>
      {isLoading && (
        <Loader>
          <LoaderText>Loading...</LoaderText>
        </Loader>
      )}
      <Table>
        <thead>
          <tr>
            {columns.map(column => {
              const { name, isSortable } = column

              return (
                <th
                  key={name}
                  onClick={isSortable ? column.onSort : undefined}
                  style={{ cursor: isSortable ? 'pointer' : 'auto' }}
                >
                  <HeadCell>
                    {name}
                    <Chevron sortOrder={isSortable ? column.sortOrder : null}>
                      {isSortable && (column.sortOrder ? <ChevronDownIcon /> : <MinusIcon />)}
                    </Chevron>
                  </HeadCell>
                </th>
              )
            })}
          </tr>
        </thead>
        <tbody>
          {!data.length && (
            <tr>
              <td colSpan={columns.length} style={{ textAlign: 'center' }}>
                No data
              </td>
            </tr>
          )}
          {data.map(row => (
            <tr key={row[rowKey]}>
              {columns.map(({ cell, key }, itemIndex) => {
                const content = cell ? cell(row) : row[key]

                return <td key={itemIndex}>{content}</td>
              })}
            </tr>
          ))}
        </tbody>
      </Table>
    </TableWrapper>
  </Container>
)

export default CustomTable

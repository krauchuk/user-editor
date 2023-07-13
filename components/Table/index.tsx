import { Props } from './types'
import { TableContainer, Table, TableHeader, HeadCell, Chevron } from './styles'
import ChevronDown from '@/icons/ChevronDown'

const CustomTable = ({ title, rowKey, columns, data, headerSlot }: Props) => (
  <TableContainer>
    <TableHeader>
      <h3>{title}</h3>
      <div>{headerSlot}</div>
    </TableHeader>
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
                    {isSortable && column.sortOrder && <ChevronDown />}
                  </Chevron>
                </HeadCell>
              </th>
            )
          })}
        </tr>
      </thead>
      <tbody>
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
  </TableContainer>
)

export default CustomTable

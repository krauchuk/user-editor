import { Props } from './types'

const Table = ({ title, rowKey, columns, data, headerSlot }: Props) => {
  return (
    <table>
      <thead>
        <tr>
          <th>
            <h3>{title}</h3>
            {headerSlot}
          </th>
        </tr>
        <tr>
          {columns.map(column => (
            <th key={column.name} onClick={column.isSortable ? column.onSort : undefined}>
              {column.name}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map(row => (
          <tr key={row[rowKey]}>
            {columns.map((column, itemIndex) => {
              const content = column.cell ? column.cell(row) : row[column.key]

              return <td key={itemIndex}>{content}</td>
            })}
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default Table

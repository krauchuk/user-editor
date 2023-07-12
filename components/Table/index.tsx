import { Props } from './types'

const Table = ({ title, columns, data }: Props) => {
  return (
    <table>
      <thead>
        <tr>
          <th>{title}</th>
        </tr>
        <tr>
          {columns.map(column => (
            <th key={column.name}>{column.name}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((row, rowIndex) => (
          <tr key={rowIndex}>
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

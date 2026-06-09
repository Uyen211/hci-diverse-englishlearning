

export default function DataTable({
  columns = [],
  data = [],
  className = '',
  emptyMessage = 'Không tìm thấy dữ liệu',
}) {
  return (
    <div
      className={`bg-surface rounded-xl border border-primary/6 shadow-xs overflow-hidden ${className}`}
    >
      <table className="w-full border-collapse text-left">
        <thead>
          <tr className="bg-primary/3 border-b border-primary/8">
            {columns.map((col, index) => (
              <th
                key={index}
                className={`px-6 py-4 text-[13px] font-bold text-text-secondary uppercase tracking-wider ${
                  col.className || ''
                }`}
                style={col.style}
              >
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.length === 0 ? (
            <tr>
              <td
                colSpan={columns.length}
                className="px-6 py-10 text-center text-[14px] text-text-secondary"
              >
                {emptyMessage}
              </td>
            </tr>
          ) : (
            data.map((row, rowIndex) => (
              <tr key={rowIndex} className="hover:bg-primary/2 transition-colors">
                {columns.map((col, colIndex) => {
                  const isLastRow = rowIndex === data.length - 1
                  const cellClass = `px-6 py-[18px] text-[14px] text-text-primary align-middle ${
                    isLastRow ? '' : 'border-b border-primary/5'
                  }`
                  
                  return (
                    <td key={colIndex} className={cellClass}>
                      {col.render
                        ? col.render(row, rowIndex)
                        : row[col.accessor]}
                    </td>
                  )
                })}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  )
}

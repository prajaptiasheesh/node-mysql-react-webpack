const Grid = ({
    rows = [],
    columnConfigs = [],
    pagination,
    noRecord,
    ...props
}) => {

    const getHeaders = () => {
        return columnConfigs.map((item, idx) => {
            return <th key={idx}>
                {item.title}
            </th>
        })
    }

    const getRow = (row) => {
        return columnConfigs.map((col, idx) => {
            let rowHtml = null;
            if (!col.render) {
                rowHtml = <td key={idx} className="grid-cell">
                    {row[col.fieldKey]}
                </td>
            } else {
                rowHtml = <td key={idx} className="grid-cell">
                    {col.render(row)}
                </td>
            }
            return rowHtml;
        })

    }
    return <table className="table table-striped table-bordered table-hover">
        <thead className="thead-dark"> <tr>{getHeaders()}</tr> </thead>
        <tbody className="grid-body">
            {rows.length ? rows.map((row, idx) => {
                return <tr className="grid-row" key={idx}>{getRow(row)}</tr>
            }) : noRecord}
        </tbody>
    </table>
}

export default Grid;
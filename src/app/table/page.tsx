type TableProps<T> = {
    children: React.ReactNode,
    column: T[],
    data: T[]
}
const Table = (props: TableProps<any>) => {
    const { column } = props;
    return (<>H1 Table</>)
}
export default Table
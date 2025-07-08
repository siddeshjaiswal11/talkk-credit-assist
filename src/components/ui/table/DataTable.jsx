import React from 'react'
import { Column } from 'primereact/column'
import { DataTable } from 'primereact/datatable'
import './DataTable.css'

const DataTableComponent = ({
    tableData = [],
    loading = false,
    columns = [],
    totalRecords = 0,
    currentPage = 1,
    onPageChange,
    rows = 30,
}) => {
    // const [lazyTable, setLazyTable] = useState({
    //     first: (currentPage - 1) * initialRows,
    //     rows: initialRows,
    //     page: currentPage
    // });

    // useEffect(() => {
    //     setLazyTable(prev => ({
    //         ...prev,
    //         first: (currentPage - 1) * initialRows,
    //         rows: initialRows,
    //         page: currentPage
    //     }));
    // }, [currentPage, initialRows]);

    // const handlePage = (event) => {
    //     const rows = event.rows === totalRecords ? totalRecords : event.rows;

    //     setLazyTable({
    //         ...lazyTable,
    //         page: event.page + 1,
    //         rows: rows,
    //         first: event.first
    //     });

    //     if (onPageChange) {
    //         onPageChange({
    //             ...event,
    //             rows: rows
    //         });
    //     }
    // };

    if (loading) {
        return (
            <Loader />
        );
    }

    // const paginatorTemplate = {
    //     layout: 'PrevPageLink PageLinks NextPageLink',
    //     'PrevPageLink': (options) => (
    //         <button type="button" className={options.className} onClick={options.onClick} disabled={options.disabled}>
    //             Prev
    //         </button>
    //     ),
    //     'NextPageLink': (options) => (
    //         <button type="button" className={options.className} onClick={options.onClick} disabled={options.disabled}>
    //             Next
    //         </button>
    //     ),
    // };

    return (
        <div className="datatable-wrp">
            <DataTable
                value={tableData}
                className="gm-tbl"
                showGridlines
                stripedRows
                tableStyle={{ minWidth: '50rem' }}
                emptyMessage="No applications found"
                lazy
                rows={parseInt(rows)}
                totalRecords={totalRecords}
                first={(currentPage - 1) * parseInt(rows)}
                onPage={onPageChange}
                // paginator
                // paginatorTemplate={paginatorTemplate}
                // paginatorClassName="custom-paginator"
                // page={currentPage - 1}
                // paginatorPosition="bottom"

            >
                {columns.map((col) => (
                    <Column
                        key={col.field}
                        field={col.field}
                        header={col.header}
                        body={col.body}
                        style={col.style}
                    />
                ))}
            </DataTable>
        </div>
    );
};

export default DataTableComponent;

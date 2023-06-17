import { DataGrid } from '@mui/x-data-grid';

const columns = [
    { field: 'part', headerName: 'Part', width: 125 },
    { field: 'alt_part', headerName: 'Alt_Part', width: 125 },
    { field: 'name', headerName: 'Name' },
    { field: 'brand', headerName: 'Brand' },
    { field: 'model', headerName: 'Model' },
    { field: 'engine', headerName: 'Engine' },
    { field: 'car', headerName: 'Car' },
    { field: 'location_a', headerName: 'Location A' },
    { field: 'location_a_stock', headerName: 'Loc A Stock' },
    { field: 'location_b', headerName: 'Location B' },
    { field: 'location_b_stock', headerName: 'Loc B Stock' },
    { field: 'unit', headerName: 'Unit' },
    { field: 'rate', headerName: 'Rate' },
    { field: 'value', headerName: 'Value' },
    { field: 'remarks', headerName: 'Remarks' },
]

const TableData = (props) => {

    return (
        <div style={{ height: 400, width: '100%' }}>
            <DataGrid
                rows={props.tableData}
                getRowId={(row) => row.part}
                columns={columns}
                checkboxSelection
                sx={{ height: "75vh" }}
                pagination={false}
                hideFooterPagination={true}
                hideFooter={true}
                onRowSelectionModelChange={ids => {
                    props.setSelectedRows(ids);
                }}
            />
        </div>
    );
}

export default TableData;
import { Button, Grid, Tooltip, Typography } from "@mui/material"
import CSVReader from 'react-csv-reader'
import DownloadingIcon from '@mui/icons-material/Downloading'
import importAPI from "../../api/importApi"
import { useEffect, useState } from "react"
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import ImportConfirmDialog from "./importConfirmDialog"
import UpdateDialog from "./update-popup/updateDialogBox"

const Importexport = (props) => {
    let downloadEndPoint = importAPI.getDownloadCSVApi();
    let exportEndPoint = importAPI.getExportCSVApi();
    const [importData, setImportData] = useState();
    const [importFileName, setImportFileName] = useState();
    const [confirmationDialogOpen, setConfirmationDialogOpen] = useState(false);
    const [updateDialogOpen, setUpdateDialogOpen] = useState(false);

    useEffect(() => {
        if (!confirmationDialogOpen) {
            document.getElementById('csvImport').value = '';
        }
    }, [confirmationDialogOpen]);

    const handleImportSubmit = () => {
        let newImportData = importData.filter((data, index) => index !== 0 && data.length === 15)
        importAPI.importStocks(newImportData).then(res => {
            if (res.status === 200) {
                props.fetchStockData();
                setConfirmationDialogOpen(false);
            }
        });
    }

    const deleteStocksClick = () => {
        importAPI.deleteStocks(props.selectedRows).then(res => {
            if (res.status === 200) {
                props.fetchStockData();
            }
        });
    }

    const handleUpdateClick = () => {
        setUpdateDialogOpen(true);
    }

    const handleConfirmInput = () => {
        handleImportSubmit();
    }

    return <>
        <Grid item container lg={8} alignItems={"center"} sx={{ paddingLeft: 2 }}>

            <CSVReader
                onFileLoaded={(data, fileInfo, originalFile) => {
                    setImportFileName(fileInfo);
                    setImportData(data);
                    setConfirmationDialogOpen(true);
                }}

                inputName={"csvImport"}
                inputId={"csvImport"}
                sx={{ display: "none" }}
                inputStyle={{ display: "none" }}
            />

            <ImportConfirmDialog
                open={confirmationDialogOpen}
                importFileName={importFileName}
                importData={importData}
                setOpen={setConfirmationDialogOpen}
                onConfirmInput={handleConfirmInput}
            />

            <Button variant="contained" sx={{ marginRight: 2 }}>
                <label for="csvImport" style={{ cursor: "pointer" }}>
                    Import
                </label>
            </Button>

            <a variant="text" href={downloadEndPoint} >
                <Tooltip title="Download sample CSV">
                    <DownloadingIcon />
                </Tooltip>
            </a>

        </Grid>

        <Grid item container lg={4} justifyContent={"end"} alignItems={"center"} sx={{ paddingRight: 5 }}>
            {
                props.selectedRows.length
                    ? <>
                        <Typography variant="p">
                            {props.selectedRows.length} : Items Selected
                        </Typography>
                        <Button onClick={handleUpdateClick} >
                            <Tooltip title={`Update ${props.selectedRows.length || 0} Record(s)`}>
                                <EditIcon />
                            </Tooltip>
                        </Button>

                        <UpdateDialog
                            open={updateDialogOpen}
                            selectedRows={props.selectedRows}
                            tableData={props.tableData}
                            onClose={() => setUpdateDialogOpen(false)}
                            fetchData={props.fetchStockData}
                        />

                        <Button onClick={deleteStocksClick} sx={{ marginRight: 5 }}>
                            <Tooltip title={`Delete ${props.selectedRows.length || 0} Record(s)`}>
                                <DeleteIcon />
                            </Tooltip>
                        </Button>
                    </>
                    : ''
            }
            <a href={exportEndPoint}>
                <Tooltip title={`Export All Record`}>
                    <CloudUploadIcon />
                </Tooltip>
            </a>
        </Grid>
    </>
}
export default Importexport
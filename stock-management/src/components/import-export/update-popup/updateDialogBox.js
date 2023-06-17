import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import UpdateRow from './updateRow';
import { Grid } from '@mui/material';
import importApi from '../../../api/importApi';

const UpdateDialog = props => {
    const { open, selectedRows, tableData } = props;
    const [formData, setFormData] = useState([]);
    const [dataToSend, setDataToSend] = useState({});

    useEffect(() => {
        setFormData(tableData.filter(row => {
            return selectedRows.find(selectedRow => row.part === selectedRow);
        }))
    }, [selectedRows])


    const handleClose = () => {
        props.onClose();
    };

    const handleRowUpdate = (partId, locA, locB) => {
        let newData = dataToSend;
        newData[partId] = {
            locA,
            locB,
        }
        setDataToSend({ ...newData })
    }

    const handleSubmit = () => {
        let newData = [];
        for (let partId in dataToSend) {
            newData.push({
                partId: partId,
                locA: dataToSend[partId].locA,
                locB: dataToSend[partId].locB
            })
        }

        let body = {
            rowsToUpdate: newData,
        }

        importApi.updateStocks(body).then((res) => {
            if (res.status === 200) {
                props.fetchData();
                handleClose();
            }
        });

    }

    return <Dialog
        open={open}
        fullWidth
        maxWidth={"md"}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
    >
        <DialogTitle id="alert-dialog-title">
            You have selected {props.selectedRows?.length} rows
        </DialogTitle>
        <DialogContent>
            <DialogContentText id="alert-dialog-description">
                <Grid container>
                    <Grid item lg={3} sx={{ fontWeight: "bold" }}>Part</Grid>
                    <Grid item lg={3} sx={{ fontWeight: "bold" }}>Alt Part</Grid>
                    <Grid item lg={2} sx={{ fontWeight: "bold" }}>Model</Grid>
                    <Grid item lg={2} sx={{ fontWeight: "bold" }}>LocA Stock</Grid>
                    <Grid item lg={2} sx={{ fontWeight: "bold" }}>LocB Stock</Grid>
                </Grid>
                {
                    formData.map(singleRow => {
                        return <UpdateRow rowData={singleRow} onChange={handleRowUpdate} />
                    })
                }
            </DialogContentText>
        </DialogContent>
        <DialogActions>
            <Button onClick={handleClose} variant={"contained"} color={"error"}>Cancel</Button>
            <Button onClick={handleSubmit} variant={"contained"} autoFocus>
                Update Records
            </Button>
        </DialogActions>
    </Dialog>

}

export default UpdateDialog; 
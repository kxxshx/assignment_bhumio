import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Button } from "@mui/material"

const ImportConfirmDialog = (props) => {
    const { open, importFileName, importData } = props;

    const handleClose = () => {
        props.setOpen(false);
    }

    return <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
    >
        <DialogTitle id="alert-dialog-title">
            {"Are you sure you want to import ?"}
        </DialogTitle>
        <DialogContent>
            <DialogContentText id="alert-dialog-description">
                You have choosen the file {importFileName?.name} which contains the {importData?.length} row.
                Are you sure you want to import ?
            </DialogContentText>
        </DialogContent>
        <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button onClick={props.onConfirmInput} autoFocus>
                Import
            </Button>
        </DialogActions>
    </Dialog>
}

export default ImportConfirmDialog
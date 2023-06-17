import { Grid, TextField } from "@mui/material";
import { useEffect, useState } from "react";

const UpdateRow = (props) => {
    const { rowData } = props;

    const [locA, setLocA] = useState(null);
    const [locB, setLocB] = useState(null);

    useEffect(() => {
        setLocA(props.rowData.location_a_stock);
        setLocB(props.rowData.location_b_stock);
    }, [])

    return <Grid container sx={{ marginBottom: 2 }}>
        <Grid item lg={3}>{props.rowData.part}</Grid>
        <Grid item lg={3}>{props.rowData.alt_part}</Grid>
        <Grid item lg={2}>{props.rowData.model}</Grid>
        <Grid item lg={2} sx={{ paddingRight: 2 }}>
            <TextField
                id="outlined-number"
                label="Number"
                type="number"
                size="small"
                InputProps={{
                    inputProps: {
                        max: props.rowData.location_a_stock,
                        min: 0
                    }
                }}
                value={locA}
                onChange={(e) => {
                    props.onChange(props.rowData.part, e.target.value, locB);
                    setLocA(e.target.value)
                }}
            />
        </Grid>
        <Grid item lg={2} sx={{ paddingRight: 2 }}>
            <TextField
                id="outlined-number"
                label="Number"
                type="number"
                size="small"
                InputProps={{
                    inputProps: {
                        max: props.rowData.location_b_stock,
                        min: 0
                    }
                }}
                value={locB}
                onChange={(e) => {
                    props.onChange(props.rowData.part, locA, e.target.value);
                    setLocB(e.target.value)
                }}
            />
        </Grid>
    </Grid>
}

export default UpdateRow;
import logo from './logo.svg';
import './App.css';
import Header from './components/header/header';
import Importexport from './components/import-export/importex';
import Tabledata from './components/table-data/tabledata';
import { Grid } from '@mui/material'
import importApi from './api/importApi';
import stockApi from './api/stockApi';
import { useEffect, useState } from 'react';

function App() {

  const [tableData, setTableData] = useState([])
  const [selectedRows, setSelectedRows] = useState([]);

  const fetchStockData = () => {
    stockApi.getStocks().then(res => {
      if (res.data?.data) {
        setTableData(res.data.data);
      }
    }).catch(err => console.log('error in fetching>>>>', err))
  }

  useEffect(() => {
    fetchStockData();
  }, []);

  useEffect(() => {
    console.log('table data updated>>>>', tableData, selectedRows);
  }, [tableData, selectedRows])

  return <>
    <Grid container>
      <Grid item lg={12} md={12} sm={12} xs={12}>
        <Header />
      </Grid>
      <Grid
        item
        container
        alignItems={"center"}
        justifyContent={"space-between"}
        lg={12} md={3} sm={12}
        sx={{ marginBottom: 2 }}
      >
        <Importexport
          selectedRows={selectedRows}
          fetchStockData={fetchStockData}
          tableData={tableData}
        />
      </Grid>
      <Grid item lg={12} >
        <Tabledata tableData={tableData} setSelectedRows={setSelectedRows} />
      </Grid>
    </Grid>
  </>
}

export default App;

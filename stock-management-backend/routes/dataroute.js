const express = require('express');
const router = express.Router();
const data = require('../task-controller/task-controller');

// Routes for different operation to be performed 
router.get('/getData', data.getData);
router.post('/updateData', data.updateData);
router.delete('/deleteData', data.deleteData);
router.get('/download-sample-csv', data.downloadSampleCSV)
router.get('/download-csv', data.downloadCSV);
router.post('/stocks', data.insertData);


let dataRoutes = router
module.exports = dataRoutes;
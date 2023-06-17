const express = require('express')
const app = express()
const bodyparser = require('body-parser')
const cors = require('cors');
const port = 4200
const dataRoutes = require('./routes/dataroute')

let dbConfig = require('./config/db')
dbConfig.init();

app.use(cors())

app.use(bodyparser.urlencoded({ extended: true }))
app.use(bodyparser.json())

app.use(dataRoutes);

app.listen(port, () => console.log(`app listening on ${port}`))



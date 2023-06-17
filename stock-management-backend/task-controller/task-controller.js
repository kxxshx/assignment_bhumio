// API for all the functioning/operations regarding the CSV

const { Parser } = require('@json2csv/plainjs');
const { execute } = require('../config/db');
const { writeFile } = require('fs').promises;

// Getting data of all the rows from the table
const q = `SELECT * FROM stocks`;
getData = ((req, res) => {
    pool.query(q, (err, dbRes) => {
        if (err) {
            return res.json({ error: err });
        }
        else {
            for (let row of dbRes.rows) {
                console.log(row);
            }
            console.log("Connected")
        }
        return res.json({ status: true, data: dbRes.rows });
    });

})

// Inserting new data into the table
insertData = async (req, res) => {
    let sql = 'INSERT INTO stocks VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15) ON CONFLICT(part) DO NOTHING';
    let data = req.body?.map(b => {
        return Object.values(b);
    })

    let insertResult = [];

    for (let record of data) {
        insertResult.push(await execute(sql, record));
    }
    return res.json(insertResult);
}

// Updating data of selectedrows 
updateData = (async (req, res) => {
    const rows = req.body.rowsToUpdate;
    for (let row of rows) {
        let sql = `UPDATE stocks SET location_a_stock=$1,location_b_stock=$2 WHERE part =$3`;
        await execute(sql, [row.locA, row.locB, row.partId]);
    }
    return res.send();
}
)


//deleting the data of selected/all rows
deleteData = (async (req, res) => {
    console.log("delete");
    const partIds = req.body.ids;
    console.log(partIds);
    let sql = `DELETE from stocks where part=ANY($1::text[])`;

    pool.query(sql, [partIds], (err, result) => {
        if (err) {
            return res.json(err)
        }
        else {
            res.json({ status: true, data: { result }, messsage: "deleted" })
        }
    })
}

)

//Downloading sample csv for user convenience
downloadSampleCSV = (req, res) => {

    return res.download(`${__dirname}/../uploads/sample-csv-import.csv`)
}

// Exporting CSV 
downloadCSV = (async (req, res) => {
    console.log("downloading....")
    pool.query(q, async (err, result) => {
        if (err) {
            res.json({ error: err })
        }
        else {
            const jsonData = JSON.parse(JSON.stringify(result.rows));

            const opts = {
                header: true,
            };
            const parser = new Parser(opts);
            const csv = parser.parse(jsonData);

            writeFile('public/data.csv', csv).then(() => {
                res.download('public/data.csv');
            });
        }
    })

})

module.exports = { getData, deleteData, updateData, downloadSampleCSV, downloadCSV, insertData }
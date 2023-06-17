const Pool = require('pg').Pool
const init = () => {
  global.pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'mydb',
    password: 'test',
    port: 5432,
  })
}

const execute = (query, preparedStatements) => {
  return new Promise((resolve, reject) => {
    pool.query(query, preparedStatements, (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    })
  })
}
module.exports = { init, execute }
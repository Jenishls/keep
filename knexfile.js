// Update with your config settings.

const path = require('path')
module.exports = {
  client:'mssql',

  connection : {
    host : 'localhost',
    user : 'sa',
    password : 'software',
    database : 'Intranet'
  },
  migrations:{
    tableName : 'migrations',
    diretory : path.resolve(__dirname,'./migrations'),
  },
  useNullasDefault : true
}

var mysql = require('mysql');

var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root'
});

connection.connect((err) => {
  if (err) {
    console.log('err encountered: ', err);
  } else {
    console.log('connected to mysql');
  }
})

module.exports= {
  connection
}

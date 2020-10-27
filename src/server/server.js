const express = require('express');
const mysql = require('mysql');

const app = express();
const port = 8080;
const table ='boards';

const pool = mysql.createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PWD,
    database: process.env.MYSQL_DB,
});

app.listen(port, () => {
    console.log(`App server now listening to port ${port}`);
});
app.use(function(req, res, next){
   res.header("Access-Control-Allow-Origin","*");
   res.header("Access-Control-Allow-Headers","Origin, X-Request-With, Content-Type, Accept");
   next();
});

app.get('/api/boards', (req, res) => {
    debugger;
    pool.query(`select * from ${table}`, (err, rows) => {
        if (err) {
            res.send(err);
        } else {
            res.send(rows);
        }
    });
});

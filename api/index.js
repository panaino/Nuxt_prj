const express = require("express");
const app = express();

const mysql = require('mysql');
// DB接続情報
const con = mysql.createConnection({
    multipleStatements: true,
    host: 'localhost',
    port: '3306',
    user: 'root',
    password: 'rootpass',
    database: 'Node_Poke_Project'
});


app.get("/pesonality", function (req, res) {
    let sql = 'SELECT * FROM TB_PESONRALITY'
    con.query(sql
        , function (err, results, fields) {
            if (err) throw err;
            res.send(results);
        });
});

app.get("/parameter", function (req, res) {
    let sql = 'SELECT * FROM TB_PARAMETER_INFO ORDER BY DISP_NO asc'
    con.query(sql
        , function (err, results, fields) {
            if (err) throw err;
            res.send(results);
        });
});

app.get("/monster", function (req, res) {
    let sql = 'SELECT * FROM TB_MONSTER_INFO'
    con.query(sql
        , function (err, results, fields) {
            if (err) throw err;
            res.send(results);
        });
});


module.exports = {
    path: "/api/",
    handler: app
};
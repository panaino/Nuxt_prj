const express = require("express");
const app = express();

app.use(express.json())
app.use(express.urlencoded({ extended: true }));

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

// 育成済みポケモン全件取得
app.get("/selectBredMonster", function (req, res) {
    let sql = 'SELECT * FROM TB_BRED_MONSTER'
    con.query(sql,
        function (err, results, fields) {
            if (err) throw err;
            res.send(results);
        })
});
// 性格一覧取得
app.get("/personality", function (req, res) {
    let sql = 'SELECT * FROM TB_PERSONALITY'
    con.query(sql
        , function (err, results, fields) {
            if (err) throw err;
            res.send(results);
        });
});
// パラメータ一覧取得
app.get("/parameter", function (req, res) {
    let sql = 
      'SELECT *'
    + ' FROM TB_PARAMETER_INFO'
    + ' ORDER BY DISP_NO asc'
    con.query(sql
        , function (err, results, fields) {
            if (err) throw err;
            res.send(results);
        });
});
// 全ポケモンのデータ一覧を取得
app.get("/monster", function (req, res) {
    let sql = 'SELECT * FROM TB_MONSTER_INFO'
    con.query(sql
        , function (err, results, fields) {
            if (err) throw err;
            res.send(results);
        });
});
// モンスターを登録
app.post("/insert", function (req, res) {
    let data = req.body
    let status = data.status
    let sql =
      " INSERT INTO TB_BRED_MONSTER "
    + " VALUES( "
    + "null"
    + "   , '" + data.name
    + "' , '" + data.personality.name
    + "' , '" + data.ability
    // 努力値
    + "' , " + status["H"]["effortValue"]
    + "," + status["A"]["effortValue"]
    + "," + status["B"]["effortValue"]
    + "," + status["C"]["effortValue"]
    + "," + status["D"]["effortValue"]
    + "," + status["S"]["effortValue"]
    // 実数値
    + "," + status["H"]["calcValue"]
    + "," + status["A"]["calcValue"]
    + "," + status["B"]["calcValue"]
    + "," + status["C"]["calcValue"]
    + "," + status["D"]["calcValue"]
    + "," + status["S"]["calcValue"]
    + " ); "
    con.query(sql
        , function (err, results, fields) {
            if (err) throw err;
        })
    res.send('ok');
    });

/**
 * HPの実数値を計算する。
 * @param {*} effortValue 努力値 
 * @param {*} zeroToV 個体値
 * @param {*} tribeValue 種族値
 */
function calcStatusHp(effortValue, zeroToV, tribeValue) {
    return (tribeValue * 2 + zeroToV + effortValue / 4) * 50 / 100 + 50 + 10
}

/**
 * HP以外のステータス実数値を計算する。
 * @param {*} effortValue 努力値
 * @param {*} zeroToV 個体値
 * @param {*} tribeValue 種族値
 */
function calcOtherStatus(effortValue, zeroToV, tribeValue) {
    return ((tribeValue * 2 + zeroToV + effortValue / 4) * 50 / 100 + 5)
}


module.exports = {
    path: "/api/",
    handler: app
};
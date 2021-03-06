// 메인이라고 부르는. 메인 기능 넣음

var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var auth = require('../lib/auth');

// my sql 셋팅
var config = require('../../config/config.json');
var connection = mysql.createConnection({
  host: config.host,
  user: config.username,
  password: config.password, // 본인 비번 쓰기!
  database: config.database
});
connection.connect();

// 메뉴 입력하는 API
router.post('/franMenuInsert', auth, function(req, res) {
  console.log(req.body);

  var userData = req.decoded;
  var ID = userData.userId;
  var PW = userData.userPw;
  console.log(ID);
  console.log(PW);

  var menu = req.body.menu;
  var price = req.body.price;

  var sql1 =
    'INSERT INTO fintech.franchise (franchiseCode, name, franId, franPw, menu, price) VALUES (?,?, ?, ?, ?, ?)';
  var sql2 =
    'SELECT franchiseCode, name FROM fintech.franchise WHERE franId = ?';
  var sql3 = 
    'DELETE FROM franchise WHERE menu IS NULL'
  connection.query(sql2, ID, function(error, results, fields) {
    if (error) throw error;
    var franCode = results[0].franchiseCode;
    var franName = results[0].name;
    console.log('franCode' + franCode);

    // franID에 해당하는 가맹점의 코드를 불러와서 함께 DB에 insert
    connection.query(sql1, [franCode, franName, ID, PW, menu, price], function(
      error,
      results,
      fields
    ) {
      if (error) throw error;
      console.log('The result is: ', results);
      console.log('sql is ', this.sql);
      res.json(1);
    });
  });
  connection.query(sql3, function(error, results, fields) {
    if (error) throw error;
  })
});

// 메뉴 전체 조회 API
router.get('/franMenuSelect', function(req, res) {
  // var userID = req.body.franId;

  var sql = 'SELECT menu, price FROM fintech.franchise WHERE franId = ?';
  connection.query(sql, [userID], function(error, results, fields) {
    if (error) throw error;
    console.log(results[0].franPw, userPassword);
    console.log(results);

    res.json(results);
  });
});

// 메뉴 삭제하는 API / 약간 미완
router.post('/franMenuDelete', function(req, res) {
  console.log(req.body);
  var entCode = req.body.franCode;
  var name = req.body.name;
  var ID = req.body.franId;
  var PW = req.body.franPw;
  var menu = req.body.menu;
  var price = req.body.price;

  var sql = 'DELETE FROM fintech.franchise WHERE franId = ?';
  connection.query(sql, [userID], function(error, results, fields) {
    if (error) throw error;
    console.log(results[0].franPw, userPassword);

    console.log(results);
    res.json(results);
  });
});

// 메뉴 수정하는 API / 미완
router.post('/franMenuUpdate', function(req, res) {
  console.log(req.body);
  var entCode = req.body.franCode;
  var name = req.body.name;
  var ID = req.body.franId;
  var PW = req.body.franPw;
  var menu = req.body.menu;
  var price = req.body.price;

  // 쿼리 수정하기
  var sql =
    'UPDATE fintech.franchise SET menu = ?, price = ?  WHERE franchiseCode = ?)';
  connection.query(sql, [userID], function(error, results, fields) {
    if (error) throw error;
    console.log(results[0].franPw, userPassword);
    console.log(results);
    res.json(results);
  });
});

module.exports = router;

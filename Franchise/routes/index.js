// 메인이라고 부르는. 메인 기능 넣음

var express = require('express');
var router = express.Router();
var mysql = require('mysql');

// my sql 셋팅
var config = require('../../config/config.json');
var connection = mysql.createConnection({
  host: config.host,
  user: config.username,
  password: config.password, // 본인 비번 쓰기!
  database: config.database
});
connection.connect();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/franMain', function(req, res) {
  res.render('franMain');
});

router.get('/franMenuedit', (req, res) => {
  res.render('franMenuedit');
});

module.exports = router;

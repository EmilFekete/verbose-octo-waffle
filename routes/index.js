const express = require('express');
const router = express.Router();
const mongo = require(".././util/database.js");

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

router.post('/generate-link', function (req, res, next) {
  let count = mongo.getDb().collection("links").count()
  let links = mongo.getDb().collection("links").find()
  console.log(`Num of links ${count}`)
  console.log(links)
  res.render('link', {link: links})
});

module.exports = router;

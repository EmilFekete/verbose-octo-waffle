var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

router.post('/generate-link', function (req, res, next) {
  res.render('link', {link: "faszom"})
});

module.exports = router;

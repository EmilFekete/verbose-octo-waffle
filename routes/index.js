const express = require('express');
const router = express.Router();
const mongo = require(".././util/database.js");
var ObjectId = require('mongodb').ObjectId;

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index')
})

router.post('/generate-link', function (req, res, next) {
  const collection = mongo.getDb().collection("links")

  collection.insertOne({})
    .then((inserted) => {
      res.redirect(`/links/${inserted.insertedId}`)
    })
})

router.get('/links/:linkId', function (req, res, next) {
  const collection = mongo.getDb().collection("links")

  collection.findOne({ "_id": new ObjectId(req.params["linkId"]) })
    .then((found) => {
      console.log(found)
    })

})

module.exports = router;

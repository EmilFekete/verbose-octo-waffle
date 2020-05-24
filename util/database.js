const mongoose = require('mongoose');

const mongoConnect = () => mongoose.connect(
  'mongodb+srv://Femil:Pina123@verbose-octo-waffle-la5jh.mongodb.net/test',
  { useNewUrlParser: true }
)
  .then(dunno => {
    console.log("Connected!")
    console.log(dunno)
  })
  .catch(err => {
    console.log(err);
    throw err;
  });

exports.mongoConnect = mongoConnect;

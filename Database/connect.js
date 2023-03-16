const mongoose = require("mongoose");

mongoose.connect('mongodb://127.0.0.1:27017/mini-project').then(() => { console.log('connected to db') })
  .catch((error) => {
    console.log(error)
  })
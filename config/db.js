const mongoose = require("mongoose");
mongoose.connect(process.env.DBURL)
  .then(() => {
    console.log("COnnection Successfull!!!");
  })
  .catch((err) => {
    console.log(err);
  });

  module.exports = mongoose;
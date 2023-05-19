const mongoose = require("mongoose");
require("dotenv").config();

mongoose
  .connect(process.env.MONGO_URI, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  })
  .then(() => console.log(`MongoDB connected to CRUD-DB`))
  .catch((err) =>
    console.error(`Failed to connected to CRUD-DB -  ${err.message}`)
  );

module.exports = mongoose;

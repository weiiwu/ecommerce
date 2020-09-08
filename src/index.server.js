const express = require("express");
const env = require("dotenv");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

//routes
const authRoutes = require("./routes/auth");
const adminRoutes = require("./routes/admin/auth");

//environment varibles
env.config();

//DB connection
// mongodb+srv://root:<password>@cluster0.dpwoi.mongodb.net/<dbname>?retryWrites=true&w=majority

mongoose
  .connect(
    `mongodb+srv://${process.env.MONGO_DB_USER}:${process.env.MONGO_DB_PW}@cluster0.dpwoi.mongodb.net/${process.env.MONGO_DB_NAME}?retryWrites=true&w=majority`,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    }
  )
  .then(() => {
    console.log("DB connected");
  });

// app.use(bodyParser());
app.use(bodyParser.json());
app.use("/api", authRoutes);
app.use("/api", adminRoutes);

app.listen(process.env.PORT, () => {
  console.log(`Server Port: ${process.env.PORT}`);
});

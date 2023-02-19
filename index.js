const express = require("express");
const app = express();
const PORT = process.env.PORT || 4050;

app.get("/", (req, res) => {
  res.send(`Hey it's working !!`);
});
app.listen(PORT, () => console.log(`server up and running at  ${PORT}`));

const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cors = require("cors");


const authRoute = require("./routes/auth/auth");
const authDashboard = require("./routes/auth/authDashboard");


dotenv.config();

mongoose.connect(
  process.env.DB_CONNECT,
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => console.log("connected to db,  ")
);

app.use(express.json(), cors());


app.use("/api/users", authRoute);
app.use("/api/dashboard", authDashboard);
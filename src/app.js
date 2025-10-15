const express = require("express");
const connectDb = require("./config/database");
const app = express();
const cors = require('cors')
app.use(express.json());
const cookieParser = require("cookie-parser");
app.use(cookieParser());
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
  }))
const authRouter = require('./routes/auth.js')
const profileRouter = require('./routes/profile.js')
const requestRouter = require('./routes/request.js');
const userRouter = require("./routes/user.js");



app.use("/", authRouter);
app.use("/", profileRouter);
app.use("/", requestRouter);
app.use('/',userRouter)
connectDb()
  .then(() => {
    console.log("Connected to database successfully");
    app.listen(3000, () => {
      console.log("Server is running on port 3000");
    });
  })
  .catch((err) => {
    console.log("Error connecting to database", err);
  });

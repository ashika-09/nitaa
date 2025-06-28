const express = require("express");
const app = express();
const DB = require("./config/db.js");
const cookieParser = require("cookie-parser");
require("dotenv").config();
const authRouter = require("./routes/auth.js");
const taskRouter = require("./routes/task.js");
const PORT = process.env.PORT || 5000;
const cors = require("cors");
app.use(express.json());
app.use(cookieParser());
const allowedOrigins = [
  "https://nitaa-two.vercel.app",
  "https://task-manager-fawn-mu.vercel.app"
];

app.use(
  cors({
    origin: function (origin, callback) {
      // Allow requests with no origin (like mobile apps, Postman)
      if (!origin) return callback(null, true);
      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      } else {
        return callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);
app.use("/", authRouter);
app.use("/tasks", taskRouter);

DB()
  .then(() => {
    console.log("DB connected ");
    app.listen(PORT, () => {
      console.log("App is listening on port 5000");
    });
  })
  .catch((err) => {
    console.error(err);
  });

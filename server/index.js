import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";

import userRouter from "./routes/user.route.js";
import authRouter from "./routes/auth.route.js";

dotenv.config();

mongoose
  .connect(process.env.MONGO)
  .then(() => {
    console.log("db connected successfully");
  })
  .catch((e) => {
    console.log(e);
  });

const app = express();

app.listen(3000, () => {
  console.log("server is runnin in 3000");
});

app.get("/", (req, res) => {
  res.send("hello world");
});
app.use(express.json());

app.use("/api/user", userRouter);
app.use("/api/auth", authRouter);
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "internal servor error";

  res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});

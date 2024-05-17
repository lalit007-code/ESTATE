import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
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

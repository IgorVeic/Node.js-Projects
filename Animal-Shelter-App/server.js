import "dotenv/config";
import express from "express";
import { globalRouter } from "./const/router.const.js";
import { connect } from "mongoose";
import { MONGO_URI } from "./const/db.const.js";

const app = express();
app.use(express.json());

app.use("/api", globalRouter);

connect(MONGO_URI)
  .then(() => {
    console.log("You are successfully connected to MongoDB! ✅");
    app.listen(process.env.PORT, process.env.HOST, async () => {
      console.log(
        `🚀 The server is running on port ${process.env.PORT} and hosted at ${process.env.HOST}`
      );
    });
  })
  .catch((error) => {
    console.log("Problem encountered while connecting to MongoDB", { error });
  });

import express from "express";
import router from "./consts/router.const.js";
import cors from "cors";

// Express
const app = express();

// Middlewares
app.use(express.json());
app.use(cors());

app.use((req, res, next) => {
  console.log(
    `Made API call to ${req.method}: ${req.url} on ${new Date().toISOString()}`
  );
  next();
});

app.use("/api", router);

// Server
const PORT = 3000;
const HOSTNAME = "localhost";

app.listen(PORT, HOSTNAME, () => {
  console.log(`🚀 App is running on http://${HOSTNAME}:${PORT}`);
});

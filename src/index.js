import express from "express";
import { StatusCodes } from "http-status-codes";

import { PORT } from "./config/serverConfig.js";
const app = express();
app.get("/ping", (req, res) => {
  return res.status(StatusCodes.OK).json({ message: "pongs" });
});
app.listen(PORT, () => {
  console.log("server is runnin on " + PORT);
});

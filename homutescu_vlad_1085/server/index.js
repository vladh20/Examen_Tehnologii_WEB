import express, { json } from "express";
import { initialize } from "./entities.js";
import routes from "./routes.js";
import cors from "cors";

const app = express();
app.use(function (req, res, next) {
  next();
});
app.use(json());
app.use(cors());
app.use("", routes);

app.listen(8080, async () => {
  try {
    await initialize();
    console.log("The app is running on port 8080");
  } catch (err) {
    console.log(err);
  }
});

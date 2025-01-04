import express, { json } from "express";
import { config } from "dotenv";
import cors from "cors";
import database from "./src/config/database.js";
import userRoute from "./src/users/userRoute.js";
import productRoute from "./src/product/productRoute.js";

config();

const port = 5000 || process.env.PORT;

const app = express();

/* ----------------------------------------------------------------------------
                        middleware
------------------------------------------------------------------------------*/
app.use(json());
app.use(
  cors({
    origin: ["http://localhost:5173"],
    credentials: true,
  })
);

/* ----------------------------------------------------------------------------
                       Mongoose
------------------------------------------------------------------------------*/
database();

/* ----------------------------------------------------------------------------
                       API
------------------------------------------------------------------------------*/
userRoute(app);
productRoute(app);

/* ----------------------------------------------------------------------------
                       Home 
------------------------------------------------------------------------------*/
app.get("/", (req, res) => {
  res.json({
    name: "Project Server",
    message: "Server is running..",
  });
});

app.listen(port, () => {
  console.log(`server is running on ${port}`);
});

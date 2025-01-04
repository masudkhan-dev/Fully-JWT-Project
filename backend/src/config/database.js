/* ----------------------------------------------------------------------------
                       Mongoose Connect
------------------------------------------------------------------------------*/

import mongoose from "mongoose";

const database = () => {
  mongoose
    .connect(process.env.MONGODB_URI)
    .then(() => console.log("MongoDB connected Successfully"))
    .catch((err) => console.error("MongoDB connection error", err));
};

export default database;

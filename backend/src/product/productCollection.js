/* ----------------------------------------------------------------------------
                       Product Model
------------------------------------------------------------------------------*/

import mongoose from "mongoose";

const productSchema = mongoose.Schema({
  url: { type: String, required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
});

const productCollection = mongoose.model("product", productSchema);

export default productCollection;

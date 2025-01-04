/* ----------------------------------------------------------------------------
                       src/product/productRoute.js
------------------------------------------------------------------------------*/

import verifyToken from "../middleware/verifyToken.js";
import productCollection from "./productCollection.js";

const productRoute = (app) => {
  // POST
  app.post("/product", verifyToken, async (req, res) => {
    const result = await productCollection.create(req.body);
    res.send(result);
  });

  // GET
  app.get("/product", async (req, res) => {
    const result = await productCollection.find();
    res.json(result);
  });
};

export default productRoute;

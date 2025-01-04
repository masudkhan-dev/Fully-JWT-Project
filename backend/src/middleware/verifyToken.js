/* ----------------------------------------------------------------------------
                       JWT Token Verify
------------------------------------------------------------------------------*/

import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const verifyToken = (req, res, next) => {
  const header = req.headers["authorization"];
  const token = header && header.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Token Not Found" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.userId;
    next();
  } catch (err) {
    return res.status(403).json({ message: "Invalid Token" });
  }
};

export default verifyToken;

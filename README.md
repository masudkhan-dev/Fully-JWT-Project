for server code dependencis

> npm i bcryptjs cors dotenv express jsonwebtoken mongoose

 add this in package.json
>  "type": "module",

>  use .js for customly created js file like this

import verifyToken from "../middleware/verifyToken.js";
import productCollection from "./productCollection.js";

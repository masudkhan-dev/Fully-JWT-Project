/* ----------------------------------------------------------------------------
                       User
------------------------------------------------------------------------------*/
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import userCollection from "./userModel.js";


const userRoute = (app) => {
  /* ----------------------------------------------------------------------------
                           Register Api
    ------------------------------------------------------------------------------*/
  app.post("/register", async (req, res) => {
    const { name, email, password } = req.body;

    const exitsUser = await userCollection.findOne({ email });
    if (exitsUser) {
      return res.status(401).json({ message: "Email already exits" });
    }

    // hash password
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    // create new user
    const user = new userCollection({
      name,
      email,
      password: hashPassword,
    });

    await user.save();

    // genarate token
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "24h",
    });

    res.status(201).json({
      message: "Registration Successfully",
      id: user._id,
      name: user.name,
      email: user.email,
      token,
    });
  });

  /* ---------------------------------------------------------------------------
                         Login Api 
    -----------------------------------------------------------------------------*/
  app.post("/login", async (req, res) => {
    const { email, password } = req.body;
    const user = await userCollection.findOne({ email });

    if (!user) {
      return res.status(401).json({
        message: "user not found",
      });
    }

    // check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({
        message: "Password not matched",
      });
    }

    // genarate token
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "24h",
    });

    res.json({
      message: "Login Successfully",
      name: user.name,
      email: user.email,
      token,
    });
  });

  /* ---------------------------------------------------------------------------
                         GET Register 
    -----------------------------------------------------------------------------*/
  app.get("/register", async (req, res) => {
    const users = await userCollection.find();

    res.json({
      result: users,
    });
  });
};

export default userRoute;

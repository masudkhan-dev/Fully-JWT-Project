import { Route, Routes } from "react-router";
import Main from "../layout/Main";
import Home from "../page/Home/Home/Home";
import Login from "../page/Login/Login";
import Register from "../page/Register/Register";
import Post from "../page/Post/Post";

const Router = () => {
  return (
    <div className="w-[98%] mx-auto">
      <Routes>
        <Route path="/" element={<Main />}>
          <Route path="/" element={<Home />} />
          <Route path="/post" element={<Post />} />
        </Route>

        <Route>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>
      </Routes>
    </div>
  );
};

export default Router;

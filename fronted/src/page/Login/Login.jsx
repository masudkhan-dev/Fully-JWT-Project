import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { IoMdMail } from "react-icons/io";
import { Link, useNavigate } from "react-router";
import useAuth from "../../hooks/useAuth";
import { axiosSecure } from "../../hooks/axiosSecure";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const { token, login, isAuthenticate } = useAuth();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (isAuthenticate()) {
      navigate("/");
    }
  }, [navigate, isAuthenticate]);

  const onSubmit = async (data) => {
    try {
      const res = await axiosSecure.post("/login", data);
      login(res.data);
      navigate("/");
    } catch (err) {
      console.error(err.message);
    }
  };
  
  console.log(token);

  return (
    <div>
      <section className="relative flex flex-wrap lg:h-screen lg:items-center">
        <div className="w-full px-4 py-12 sm:px-6 sm:py-16 lg:w-1/2 lg:px-8 lg:py-24">
          <div className="mx-auto max-w-lg text-center">
            <h1 className="text-2xl font-bold sm:text-3xl">
              Get started today!
            </h1>
            <p className="mt-4 text-gray-500">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Et libero
              nulla eaque error neque ipsa culpa autem, at itaque nostrum!
            </p>
          </div>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="mx-auto mb-0 mt-8 max-w-md space-y-4"
          >
            <div>
              <label htmlFor="email" className="sr-only">
                Email
              </label>
              <div className="relative">
                <IoMdMail className="w-6 h-6 text-gray-400 absolute left-3 inset-y-0 my-auto" />
                <input
                  type="email"
                  placeholder="Enter your email"
                  {...register("email", { required: "Email is required" })}
                  className="w-full pl-12 py-3 text-gray-500 bg-transparent outline-none border border-gray-400 focus:border-gray-400 shadow-sm rounded-lg"
                />
                {errors.email && (
                  <p className="text-red-500 text-sm">{errors.email.message}</p>
                )}
              </div>
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter password"
                  {...register("password", {
                    required: "Password is required",
                    minLength: {
                      value: 8,
                      message: "Password must be at least 8 characters",
                    },
                    maxLength: {
                      value: 16,
                      message: "Password cannot exceed 16 characters",
                    },
                  })}
                  className="w-full pe-12 px-5 py-3 text-gray-500 bg-transparent outline-none border border-gray-400 focus:border-gray-400 shadow-sm rounded-lg"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 end-0 grid place-content-center px-4"
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
                {errors.password && (
                  <p className="text-red-500 text-sm">
                    {errors.password.message}
                  </p>
                )}
              </div>
            </div>
            <div className="flex flex-col items-center justify-between">
              <input
                type="submit"
                value="Login"
                className="cursor-pointer transition-all bg-red-500 text-white px-6 py-2 rounded border-red-600 border-b-8 hover:brightness-110 active:border-b-[2px] active:brightness-90 active:translate-y-[2px] w-full"
              />
              <p className="text-sm text-gray-500 mt-5">
                No account?
                <Link to="/register" className="underline mx-2">
                  Sign up
                </Link>
              </p>
            </div>
          </form>
        </div>
        <div className="relative h-64 w-full sm:h-96 lg:h-full lg:w-1/2">
          <img
            alt=""
            src="https://images.unsplash.com/photo-1630450202872-e0829c9d6172?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80"
            className="absolute inset-0 h-full w-full object-cover"
          />
        </div>
      </section>
    </div>
  );
};

export default Login;

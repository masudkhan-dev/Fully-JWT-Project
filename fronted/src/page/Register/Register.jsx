import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { IoMdMail } from "react-icons/io";
import { Link, useNavigate } from "react-router";
import { axiosSecure } from "../../hooks/axiosSecure";
import useAuth from "../../hooks/useAuth";

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const { register: registerStorage, isAuthenticate } = useAuth();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const res = await axiosSecure.post("/register", data);
      if (res.data.token) {
        registerStorage(res.data);
        navigate("/");
      }
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    if (isAuthenticate()) {
      navigate("/");
    }
  }, [navigate, isAuthenticate]);

  return (
    <div>
      <section className="relative flex flex-wrap lg:h-screen lg:items-center">
        <div className="w-full px-4 py-12 sm:px-6 sm:py-16 lg:w-1/2 lg:px-8 lg:py-24">
          <div className="mx-auto max-w-lg text-center">
            <h1 className="text-2xl font-bold sm:text-3xl">
              Create an Account
            </h1>
            <p className="mt-4 text-gray-500">
              Join us today! Fill out the form below to register.
            </p>
          </div>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="mx-auto mb-0 mt-8 max-w-md space-y-4"
          >
            {/* Name Field */}
            <div>
              <label htmlFor="name" className="sr-only">
                Name
              </label>
              <input
                type="text"
                placeholder="Enter your name"
                {...register("name", {
                  required: "Name is required",
                  minLength: {
                    value: 3,
                    message: "Name must be at least 3 characters",
                  },
                })}
                className="w-full px-5 py-3 text-gray-500 bg-transparent outline-none border border-gray-400 focus:border-gray-400 shadow-sm rounded-lg"
              />
              {errors.name && (
                <p className="text-red-500 text-sm">{errors.name.message}</p>
              )}
            </div>

            {/* Email Field */}
            <div>
              <label htmlFor="email" className="sr-only">
                Email
              </label>
              <div className="relative">
                <IoMdMail className="w-6 h-6 text-gray-400 absolute left-3 inset-y-0 my-auto" />
                <input
                  type="email"
                  placeholder="Enter your email"
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                      message: "Enter a valid email address",
                    },
                  })}
                  className="w-full pl-12 py-3 text-gray-500 bg-transparent outline-none border border-gray-400 focus:border-gray-400 shadow-sm rounded-lg"
                />
                {errors.email && (
                  <p className="text-red-500 text-sm">{errors.email.message}</p>
                )}
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  {...register("password", {
                    required: "Password is required",
                    minLength: {
                      value: 8,
                      message: "Password must be at least 8 characters",
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

            {/* Submit Button */}
            <div className="flex flex-col items-center justify-between">
              <input
                type="submit"
                value={isSubmitting ? "Registering..." : "Register"}
                className={`cursor-pointer transition-all bg-blue-500 text-white px-6 py-2 rounded border-blue-600 border-b-8
                  ${
                    isSubmitting
                      ? "opacity-50 cursor-not-allowed"
                      : "hover:brightness-110 active:border-b-[2px] active:brightness-90 active:translate-y-[2px]"
                  }
                  w-full`}
              />
              <p className="text-sm text-gray-500 mt-5">
                Already have an account?
                <Link to="/login" className="underline mx-2">
                  Log in
                </Link>
              </p>
            </div>
          </form>
        </div>

        {/* Image Section */}
        <div className="relative h-64 w-full sm:h-96 lg:h-full lg:w-1/2">
          <img
            alt="Register"
            src="https://images.unsplash.com/photo-1603791440384-56cd371ee9a7?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80"
            className="absolute inset-0 h-full w-full object-cover"
          />
        </div>
      </section>
    </div>
  );
};

export default Register;

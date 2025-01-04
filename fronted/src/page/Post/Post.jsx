import { useForm } from "react-hook-form";
import { axiosSecure } from "../../hooks/axiosSecure";

const Post = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = (data) => {
    console.log("Form submitted:", data);
    try {
      const res = axiosSecure.post("/product", data);
      return res.data;
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 mt-16">
      <h2 className="text-2xl font-bold mb-6 text-center gap-2 text-gray-700">
        Create New Product
      </h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div>
          <input
            {...register("url", {
              required: "url is required",
            })}
            className={`w-full p-3 border rounded-lg outline-none
              ${errors.url ? "border-red-500" : "border-gray-300"}`}
            placeholder="Enter photo URL"
          />
          {errors.url && (
            <p className="mt-1 text-red-500 text-sm">{errors.url.message}</p>
          )}
        </div>
        <div>
          <input
            {...register("title", {
              required: "Title is required",
              minLength: {
                value: 3,
                message: "Title must be at least 3 characters",
              },
            })}
            className={`w-full p-3 border rounded-lg outline-none
              ${errors.title ? "border-red-500" : "border-gray-300"}`}
            placeholder="Enter post title"
          />
          {errors.title && (
            <p className="mt-1 text-red-500 text-sm">{errors.title.message}</p>
          )}
        </div>

        <div>
          <textarea
            {...register("description", {
              required: "Description is required",
              minLength: {
                value: 10,
                message: "Description must be at least 10 characters",
              },
            })}
            rows="4"
            className={`w-full p-3 border rounded-lg outline-none
              ${errors.description ? "border-red-500" : "border-gray-300"}`}
            placeholder="Enter post description"
          />
          {errors.description && (
            <p className="mt-1 text-red-500 text-sm">
              {errors.description.message}
            </p>
          )}
        </div>

        <input
          type="submit"
          value={isSubmitting ? "Posting.." : "Post"}
          disabled={isSubmitting}
          className={`cursor-pointer transition-all bg-blue-500 text-white px-6 py-2 rounded border-blue-600 border-b-8
            ${
              isSubmitting
                ? "opacity-50 cursor-not-allowed"
                : "hover:brightness-110 active:border-b-[2px] active:brightness-90 active:translate-y-[2px]"
            }
            w-full`}
        />
      </form>
    </div>
  );
};

export default Post;

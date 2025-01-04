import { useQuery } from "@tanstack/react-query";
import { axiosPublic } from "../../hooks/axiosPublic";

const Products = () => {
  const {
    data: items = [],
    isError,
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const res = await axiosPublic("/product");
      return res.data;
    },
  });

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error: {error.message}</div>;
  refetch();

  return (
    <div>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {items.map((item, i) => (
          <div key={i}>
            <div className="overflow-hidden rounded bg-white text-slate-400 shadow-md shadow-slate-200">
              <figure>
                <img
                  src={item.url}
                  alt={item.title}
                  className="aspect-video w-full"
                />
              </figure>

              <div className="p-6">
                <header className="mb-4 flex justify-between items-center">
                  <h3 className="text-xl font-medium text-slate-700">
                    {item.title}
                  </h3>
                  {/* <p className=" text-slate-400"> $ {item.price}</p> */}
                </header>
                <p className="line-clamp-3">{item.description}</p>
              </div>

              <div className="flex justify-end p-6 pt-0">
                <button className="cursor-pointer transition-all bg-black/80 text-white px-6 py-2 rounded border-black border-b-8 hover:brightness-110 active:border-b-[2px] active:brightness-90 active:translate-y-[2px] w-full">
                  Order Now
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Products;

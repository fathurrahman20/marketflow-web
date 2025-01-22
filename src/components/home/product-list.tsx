import APIClient from "@/service/api-client";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router";
import { Button } from "../ui/button";

interface ProductListProps {
  id: number;
  name: string;
  slug: string;
  price: number;
  stock: number;
  imageId: number;
  imageUrl: string;
}

export default function ProductList() {
  const apiClient = new APIClient<ProductListProps[]>("/products");

  const { data } = useQuery({
    queryKey: ["product-list"],
    queryFn: () => {
      return apiClient.getAll({
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
    },
  });
  console.log("DaTa: ", data?.data);

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-4">
        <div className="md:flex md:items-center md:justify-between">
          <div>
            <h4 className="text-base text-[#DB4444] font-semibold">
              Our Product
            </h4>
            <h2 className="text-4xl font-semibold mt-5 mb-[60px]">
              Explore Our Products
            </h2>
          </div>
          {/* <a
            href="#"
            className="hidden text-sm font-medium text-indigo-600 hover:text-indigo-500 md:block">
            Shop the collection
            <span aria-hidden="true"> &rarr;</span>
          </a> */}
          <Button className="bg-[#DB4444] hover:bg-[#E07575] px-4 py-6">
            View All Products
          </Button>
        </div>

        <div className="mt-6 grid grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-6 md:grid-cols-4 md:gap-y-0 lg:gap-x-8">
          {data?.data.slice(0, 4).map((product) => (
            <div key={product.id} className="group relative">
              <div className="h-56 w-full overflow-hidden rounded-md bg-gray-200 group-hover:opacity-75 lg:h-72 xl:h-80">
                <img
                  alt={product.name}
                  src={product.imageUrl}
                  className="size-full object-cover"
                />
              </div>
              <h3 className="mt-4 text-sm text-gray-700">
                <Link to={`products/${product.slug}`}>
                  <span className="absolute inset-0" />
                  {product.name}
                </Link>
              </h3>
              <p className="mt-1 text-sm font-medium text-gray-900">
                {product.price}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-8 text-sm md:hidden">
          <a
            href="#"
            className="font-medium text-indigo-600 hover:text-indigo-500">
            Shop the collection
            <span aria-hidden="true"> &rarr;</span>
          </a>
        </div>
      </div>
    </div>
  );
}

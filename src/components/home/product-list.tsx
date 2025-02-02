import { Link } from "react-router";
import { Button } from "../ui/button";
import useProduct from "@/hooks/useProducts";
import CommonProductList from "../common/product/common-product-list";

export default function ProductList() {
  const { data } = useProduct({});

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
          <Link to="/products">
            <Button className="bg-[#DB4444] hover:bg-[#E07575] px-4 py-6">
              View All Products
            </Button>
          </Link>
        </div>

        <CommonProductList product={data?.data || []} />

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

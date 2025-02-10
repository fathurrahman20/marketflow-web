import { Link } from "react-router";
import { Button } from "../ui/button";
import useProduct from "@/hooks/useProducts";
import CommonProductList from "../common/product/common-product-list";
import { Skeleton } from "../ui/skeleton";

export default function ProductList() {
  const { data, isLoading } = useProduct({});

  return (
    <div className="bg-white">
      <div className="max-w-2xl px-4 py-16 mx-auto sm:px-6 sm:py-24 lg:max-w-7xl lg:px-4">
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
            <Button className="bg-[#DB4444] hidden md:block hover:bg-[#E07575] px-4 py-6">
              View All Products
            </Button>
          </Link>
        </div>

        {isLoading ? (
          <div className="flex flex-wrap justify-center mx-auto mt-8 gap-y-5 md:gap-y-0">
            {[1, 2, 3, 4].map((item) => (
              <div className="flex flex-col space-y-3" key={item}>
                <Skeleton className="h-[290px] w-[288px] rounded-xl" />
                <div className="space-y-2">
                  <Skeleton className="h-4 w-[140px]" />
                  <Skeleton className="h-4 w-[200px]" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <CommonProductList product={data?.data || []} />
        )}

        <div className="mt-8 text-sm md:hidden">
          <Link
            to="/products"
            className="font-medium text-[#DB4444] hover:text[#d84a4a]">
            Shop the collection
            <span aria-hidden="true"> &rarr;</span>
          </Link>
        </div>
      </div>
    </div>
  );
}

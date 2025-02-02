import { Link } from "react-router";
import { Button } from "../ui/button";
import CommonProductList from "../common/product/common-product-list";
import { Product } from "@/hooks/useProducts";

export default function RelatedProducts({
  products,
}: {
  products: Product[] | undefined;
}) {
  return (
    <div className="mx-auto mt-24 max-w-2xl sm:mt-32 lg:max-w-none">
      <div className="flex items-center justify-between space-x-4">
        <h2 className="text-lg font-medium text-gray-900">
          Customers also viewed
        </h2>
        <Link to="/products">
          <Button className="bg-[#DB4444] hover:bg-[#E07575] px-4 py-6">
            View All Products
          </Button>
        </Link>
      </div>
      <CommonProductList product={products || []} />
    </div>
  );
}

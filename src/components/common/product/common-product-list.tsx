import { Product } from "@/hooks/useProducts";
import { formatIdr } from "@/lib/utils";
import { Link } from "react-router";

export default function CommonProductList({
  product,
}: {
  product: Product[] | [];
}) {
  return (
    <div className="mt-6 grid grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-6 md:grid-cols-4 md:gap-y-0 lg:gap-x-8">
      {product.slice(0, 4).map((product) => (
        <div key={product.id} className="group relative">
          <div className="h-56 w-full overflow-hidden rounded-md bg-gray-200 group-hover:opacity-75 lg:h-72 xl:h-80">
            <img
              alt={product.name}
              src={product.imageUrl}
              className="size-full object-cover"
            />
          </div>
          <h3 className="mt-4 text-sm text-gray-700 truncate">
            <Link to={`/products/${product.slug}`}>
              <span className="absolute inset-0" />
              {product.name}
            </Link>
          </h3>
          <p className="mt-1 text-sm font-medium text-gray-900">
            {formatIdr(product.price)}
          </p>
        </div>
      ))}
    </div>
  );
}

import { Product } from "@/hooks/useProducts";
import { formatIdr } from "@/lib/utils";
import { Link } from "react-router";

interface ProductProps {
  data: Product[];
}

interface ProductGridProps {
  data: ProductProps | undefined;
}

export default function ProductGrid({ data }: ProductGridProps) {
  return (
    <div className="mt-6 lg:col-span-2 lg:mt-0 xl:col-span-3">
      <section
        aria-labelledby="product-heading"
        className="mt-6 lg:col-span-2 lg:mt-0 xl:col-span-3">
        <h2 id="product-heading" className="sr-only">
          Products
        </h2>

        <div className="grid grid-cols-1 gap-y-4 sm:grid-cols-2 sm:gap-x-6 sm:gap-y-10 lg:gap-x-8 xl:grid-cols-3">
          {data?.data.map((product) => (
            <Link to={`/products/${product.slug}`} key={product.id}>
              <div className="group relative flex flex-col overflow-hidden rounded-lg border border-gray-200 bg-white">
                <img
                  alt={product.name}
                  src={product.imageUrl}
                  className="aspect-[3/4] bg-gray-200 object-cover group-hover:opacity-75 sm:h-96"
                />
                <div className="flex flex-1 flex-col space-y-2 p-4">
                  <h3 className="text-sm font-medium text-gray-900 h-10">
                    <a href="">
                      <span aria-hidden="true" className="absolute inset-0" />
                      {product.name}
                    </a>
                  </h3>
                  <p className="text-sm text-gray-500 truncate">
                    {product.description}
                  </p>
                  <div className="flex flex-1 flex-col justify-end">
                    <p className="text-base font-medium text-gray-900">
                      {formatIdr(product.price)}
                    </p>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}

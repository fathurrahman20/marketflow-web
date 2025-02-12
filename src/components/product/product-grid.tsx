import { Product } from "@/hooks/useProducts";
import ProductCard from "../home/product-card";

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
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </div>
  );
}

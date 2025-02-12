import ProductCard from "@/components/home/product-card";
import { Product } from "@/hooks/useProducts";
// import useWishlists from "@/hooks/useWishlist";

export default function CommonProductList({
  product,
}: {
  product: Product[] | [];
}) {
  // const { data } = useWishlists();
  // const isWishlist = data?.data.map(wishlist => wishlist.product.id).find(product)
  return (
    <div className="mt-6 grid grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-6 md:grid-cols-4 md:gap-y-0 lg:gap-x-8">
      {product.slice(0, 4).map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}

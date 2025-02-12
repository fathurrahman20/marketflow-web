import CommonProductList from "@/components/common/product/common-product-list";
import Layout from "@/components/layout";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import useTitlePage from "@/hooks/useTitlePage";
import useWishlists from "@/hooks/useWishlist";
// import { Link } from "react-router";

export default function WishlistPage() {
  useTitlePage("Wishlist");
  const { data, isLoading } = useWishlists();
  return (
    <Layout>
      <div className="max-w-2xl px-4 py-16 mx-auto -mt-10 -mb-10 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-4">
        <div className="md:flex md:items-center md:justify-between">
          <div>
            <h4 className="text-base text-[#DB4444] font-semibold">
              Keep Dreaming Big
            </h4>
            <h2 className="text-4xl font-semibold mt-5 mb-[60px]">
              Wishlist for Your Next Adventure
            </h2>
          </div>
        </div>
        {!isLoading && data?.data.length === 0 ? (
          <div className="-my-4">
            <Alert className="py-6 mx-auto md:text-center">
              {/* <ShoppingCart className="w-4 h-4 md:hidden" /> */}
              <AlertTitle>Your wishlist is empty</AlertTitle>
              <AlertDescription>
                Browse products and add them to your wishlist for easy access
                later.
              </AlertDescription>
            </Alert>
          </div>
        ) : (
          <CommonProductList
            product={data?.data.map((item) => item.product) || []}
          />
        )}
      </div>
    </Layout>
  );
}

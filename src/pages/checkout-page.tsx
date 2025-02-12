import CheckoutForm from "@/components/checkout/checkout-form";
import Layout from "@/components/layout";
import useTitlePage from "@/hooks/useTitlePage";

export default function CheckoutPage() {
  useTitlePage("Checkout");
  return (
    <Layout>
      <main className="px-4 pt-16 pb-24 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto lg:max-w-none">
          <h1 className="sr-only">Checkout</h1>
          <div>
            <CheckoutForm />
          </div>
        </div>
      </main>
    </Layout>
  );
}

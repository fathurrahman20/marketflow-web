"use client";

import Category from "@/components/home/category";
import Hero from "@/components/home/hero";
import ProductList from "@/components/home/product-list";
import Layout from "@/components/layout";
import useTitlePage from "@/hooks/useTitlePage";

export default function Homepage() {
  useTitlePage("Home");
  return (
    <>
      <Layout>
        <Hero />
        <hr className="h-px md:mx-14 my-8 bg-gray-200 border-0 dark:bg-gray-700"></hr>
        <Category />
        <ProductList />
      </Layout>
    </>
  );
}

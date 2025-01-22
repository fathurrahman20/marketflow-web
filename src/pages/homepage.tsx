"use client";

import CardCategories from "@/components/home/card-categories";
import Hero from "@/components/home/hero";
import ProductList from "@/components/home/product-list";
import Layout from "@/components/layout";
import { Aperture, Camera } from "lucide-react";
const categories = [
  { icon: <Camera />, title: "Kamera & Fotografi", href: "/" },
  { icon: <Aperture />, title: "Lensa", href: "/" },
  { icon: <Aperture />, title: "Aksesoris Kamera", href: "/" },
  { icon: <Aperture />, title: "Kamera Drone", href: "/" },
  { icon: <Aperture />, title: "Filter & Lensa Khusus", href: "/" },
  { icon: <Aperture />, title: "Perlengkapan Studio", href: "/" },
];
export default function Homepage() {
  return (
    <>
      <Layout>
        <Hero />
        <hr className="h-px md:mx-14 my-8 bg-gray-200 border-0 dark:bg-gray-700"></hr>
        <section className="md:mx-14 px-4 md:px-0">
          <h4 className="text-base text-[#DB4444] font-semibold">Categories</h4>
          <h2 className="text-4xl font-semibold mt-5 mb-[60px]">
            Browse By Category
          </h2>

          <div className="flex flex-wrap justify-center md:justify-between gap-x-6 gap-y-6">
            {categories.map((category, index) => (
              <CardCategories
                key={index}
                icon={category.icon}
                title={category.title}
                href={category.href}
              />
            ))}
          </div>
        </section>
        <ProductList />
      </Layout>
    </>
  );
}

"use client";

import Layout from "@/components/layout";
import ProductDetail from "@/components/product-detail/product-detail";
import ProductReview from "@/components/product-detail/product-review";
import RelatedProducts from "@/components/product-detail/related-products";
import useProducts, { Product } from "@/hooks/useProducts";
import useTitlePage from "@/hooks/useTitlePage";
import APIClient from "@/service/api-client";
import { useQuery } from "@tanstack/react-query";
// import { useState } from "react";
import { useParams } from "react-router";

export interface Review {
  id: number;
  rating: number;
  content: string;
  date: string;
  datetime: string;
  author: string;
  avatarSrc: string;
}

export interface Reviews {
  average: number;
  featured: Review[];
}

const reviews: Reviews = {
  average: 4,
  featured: [
    {
      id: 1,
      rating: 5,
      content: `
        <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Debitis sequi est officiis. Vel cumque quisquam veniam neque voluptates labore animi adipisci veritatis</p>
      `,
      date: "July 16, 2024",
      datetime: "2024-07-16",
      author: "John Doe",
      avatarSrc:
        "https://images.unsplash.com/photo-1502685104226-ee32379fefbe?ixlib=rb-=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=256&h=256&q=80",
    },
    {
      id: 2,
      rating: 5,
      content: `
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit beatae rem consequuntur nam sit repellendus praesentium cumque deleniti quidem vitae, tempore quos consequatur doloremque voluptate, non in, animi recusandae corporis.</p>
      `,
      date: "July 12, 2024",
      datetime: "2024-07-12",
      author: "John Wick",
      avatarSrc:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=256&h=256&q=80",
    },
  ],
};

export default function ProductDetailPage() {
  const params = useParams();
  const { data: products } = useProducts({});
  const id = products?.data.find((product) => product.slug === params.slug)?.id;
  const relatedProducts = products?.data
    .filter((product) => product.id !== id)
    .slice(0, 4);
  const apiClient = new APIClient<Product>(`/products/${id}`);

  const { data: product } = useQuery({
    queryKey: ["products", id],
    queryFn: () => {
      return apiClient.getAll({
        headers: {
          "Content-Type": "application/json",
        },
      });
    },
    enabled: !!id,
  });
  useTitlePage(product?.data.name);

  return (
    <Layout>
      <main className="mx-auto px-4 pb-24 pt-14 sm:px-6 sm:pb-32 sm:pt-16 lg:max-w-7xl lg:px-8">
        {/* Product */}
        <div className="lg:grid lg:grid-cols-7 lg:grid-rows-1 lg:gap-x-8 lg:gap-y-10 xl:gap-x-16">
          {/* Product image */}
          <div className="lg:col-span-4 lg:row-end-1">
            <img
              alt={product?.data.name}
              src={product?.data.imageUrl}
              className="aspect-[4/3] w-full rounded-lg bg-gray-100 object-cover"
            />
          </div>

          {/* Product details */}
          <ProductDetail product={product?.data} reviews={reviews} />

          {/* Product Review */}
          <ProductReview reviews={reviews} />
        </div>

        {/* Related products */}
        <RelatedProducts products={relatedProducts} />
      </main>
    </Layout>
  );
}

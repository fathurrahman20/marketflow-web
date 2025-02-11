import Layout from "@/components/layout";
import ProductFilter from "@/components/product/product-filter";
import ProductFilterMobile from "@/components/product/product-filter-mobile";
import ProductGrid from "@/components/product/product-grid";
import { Skeleton } from "@/components/ui/skeleton";
import useProducts from "@/hooks/useProducts";
import useTitlePage from "@/hooks/useTitlePage";
import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router";

interface FilterOption {
  value: string;
  label: string;
}

export interface Filter {
  id: string;
  name: string;
  options: FilterOption[];
}

const filters: Filter[] = [
  {
    id: "brand",
    name: "Brand",
    options: [
      { value: "sony", label: "Sony" },
      { value: "canon", label: "Canon" },
      { value: "nikon", label: "Nikon" },
      { value: "fujifilm", label: "Fujifilm" },
      { value: "hasselblad", label: "Hasselblad" },
      { value: "leica", label: "Leica" },
    ],
  },
  {
    id: "category",
    name: "Category",
    options: [
      { value: "Camera & Photography", label: "Camera & Photography" },
      { value: "camera lenses", label: "Camera Lenses" },
      { value: "Camera Accessories", label: "Camera Accessories" },
      { value: "Studio Equipment", label: "Studio Equipment" },
      { value: "Drone Cameras", label: "Drone Cameras" },
      {
        value: "Specialty Filters & Lenses",
        label: "Specialty Filters & Lenses",
      },
    ],
  },
];

export default function ProductPage() {
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  useTitlePage("Products");
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [activePage] = useState(parseInt(searchParams.get("page") || "1"));

  const { data, isLoading } = useProducts({
    category: searchParams?.get("category") || undefined,
    brand: searchParams?.get("brand") || undefined,
    page: searchParams?.get("page") || undefined,
  });

  const handleChangeFilter = (key: string, value: string) => {
    const newQuery: Record<string, string> = {};
    searchParams.forEach((param, key) => {
      newQuery[key] = param;
    });

    if (value) {
      newQuery[key] = value;
    } else {
      delete newQuery[key];
    }

    const urlParams = new URLSearchParams(newQuery).toString();
    navigate(`/products?${urlParams}`);
  };

  useEffect(() => {
    handleChangeFilter("page", activePage.toString());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activePage]);

  return (
    <>
      <Layout>
        <div className="bg-white">
          <div>
            {/* Mobile filter dialog */}
            <ProductFilterMobile
              mobileFiltersOpen={mobileFiltersOpen}
              setMobileFiltersOpen={setMobileFiltersOpen}
              filters={filters}
            />

            <main className="max-w-2xl px-4 py-16 mx-auto sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
              <div className="pb-10 border-b border-gray-200">
                <h1 className="text-4xl font-bold tracking-tight text-gray-900">
                  New Arrivals
                </h1>
                <p className="mt-4 text-base text-gray-500">
                  Check out the latest collection of cameras, lenses, and
                  accessories—crafted to elevate your photography experience!
                </p>
              </div>

              <div className="pt-12 lg:grid lg:grid-cols-3 lg:gap-x-8 xl:grid-cols-4">
                <ProductFilter
                  brandValue={searchParams.get("brand")?.split(",")}
                  brandOnChange={(selectedBrand) =>
                    handleChangeFilter("brand", selectedBrand.join(","))
                  }
                  categoryValue={searchParams.get("category")?.split(",")}
                  categoryOnChange={(selectedCategory) =>
                    handleChangeFilter("category", selectedCategory.join(","))
                  }
                  setMobileFiltersOpen={setMobileFiltersOpen}
                />

                {/* Product grid */}
                {isLoading ? (
                  <div className="grid grid-cols-1 gap-y-4 sm:grid-cols-2 sm:gap-x-6 sm:gap-y-10 lg:gap-x-[312px] xl:grid-cols-3">
                    {[1, 2, 3, 4, 5, 6].map((item) => (
                      <div className="flex flex-col space-y-3" key={item}>
                        <Skeleton className="h-[250px] w-[280px] rounded-xl" />
                        <div className="space-y-2">
                          <Skeleton className="h-4 w-[250px]" />
                          <Skeleton className="h-4 w-[200px]" />
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <ProductGrid data={data} />
                )}
              </div>
            </main>
          </div>
        </div>
      </Layout>
    </>
  );
}

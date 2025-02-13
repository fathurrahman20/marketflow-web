import CardCategories from "@/components/home/card-categories";
import useCategories from "@/hooks/useCategories";
// import { Aperture, Camera } from "lucide-react";
import { Skeleton } from "../ui/skeleton";

// const categories = [
//   { icon: <Camera />, title: "Kamera & Fotografi", href: "/" },
//   { icon: <Aperture />, title: "Lensa", href: "/" },
//   { icon: <Aperture />, title: "Aksesoris Kamera", href: "/" },
//   { icon: <Aperture />, title: "Kamera Drone", href: "/" },
//   { icon: <Aperture />, title: "Filter & Lensa Khusus", href: "/" },
//   { icon: <Aperture />, title: "Perlengkapan Studio", href: "/" },
// ];

export default function Category() {
  const { data, isLoading } = useCategories();
  return (
    <section className="md:mx-14 px-4 md:px-0">
      <h4 className="text-base text-[#111827] font-semibold">Categories</h4>
      <h2 className="text-4xl font-semibold mt-5 mb-[60px]">
        Browse By Category
      </h2>

      <div className="flex flex-wrap justify-center md:justify-between gap-x-6 gap-y-6">
        {isLoading && (
          <>
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <Skeleton key={i} className="h-[180px] w-[180px] rounded-xl" />
            ))}
          </>
        )}
        {data?.data.map((category, index) => (
          <CardCategories key={index} name={category.name} />
        ))}
      </div>
    </section>
  );
}

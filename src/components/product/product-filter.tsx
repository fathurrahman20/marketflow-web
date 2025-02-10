import { PlusIcon } from "@heroicons/react/24/outline";
import useCategories from "@/hooks/useCategories";
import useBrands from "@/hooks/useBrands";
import { useState } from "react";
import { Skeleton } from "../ui/skeleton";

interface ProductFilterProps {
  setMobileFiltersOpen: (val: boolean) => void;
  categoryValue?: string[];
  categoryOnChange: (selectedCategories: string[]) => void;
  brandValue?: string[];
  brandOnChange: (selectedBrands: string[]) => void;
}

export default function ProductFilter({
  setMobileFiltersOpen,
  brandValue = [],
  brandOnChange,
  categoryValue = [],
  categoryOnChange,
}: ProductFilterProps) {
  const [selectedBrands, setSelectedBrands] = useState(brandValue);
  const [selectedCategories, setSelectedCategories] = useState(categoryValue);
  const { data: categories, isLoading: brandIsLoading } = useCategories();
  const { data: brands, isLoading: categoryIsLoading } = useBrands();

  return (
    <aside>
      <h2 className="sr-only">Filters</h2>

      <button
        type="button"
        onClick={() => setMobileFiltersOpen(true)}
        className="inline-flex items-center lg:hidden">
        <span className="text-sm font-medium text-gray-700">Filters</span>
        <PlusIcon
          aria-hidden="true"
          className="ml-1 text-gray-400 size-5 shrink-0"
        />
      </button>

      <div className="hidden lg:block">
        <form className="space-y-10 divide-y divide-gray-200">
          {/* Brand*/}
          <div>
            <fieldset>
              <legend className="block text-sm font-medium text-gray-900">
                Brand
              </legend>
              <div className="pt-6 space-y-3">
                {brandIsLoading && (
                  <div className="flex flex-col gap-y-4">
                    {[1, 2, 3, 4].map((index) => (
                      <Skeleton className="h-4 w-[200px]" key={index} />
                    ))}
                  </div>
                )}
                {brands?.data.map((brand) => (
                  <div key={brand.id} className="flex gap-3">
                    <div className="flex items-center h-5 shrink-0">
                      <div className="grid grid-cols-1 group size-4">
                        <input
                          id={`${brand.id}`}
                          checked={selectedBrands.includes(brand.name)}
                          type="checkbox"
                          onChange={(e) => {
                            const isChecked = e.target.checked;
                            const updatedBrands = isChecked
                              ? [...selectedBrands, brand.name]
                              : selectedBrands.filter(
                                  (val) => val !== brand.name
                                );

                            setSelectedBrands(updatedBrands);
                            brandOnChange(updatedBrands);
                          }}
                          className="col-start-1 row-start-1 bg-white border border-gray-300 rounded appearance-none checked:border-indigo-600 checked:bg-indigo-600 indeterminate:border-indigo-600 indeterminate:bg-indigo-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:border-gray-300 disabled:bg-gray-100 disabled:checked:bg-gray-100 forced-colors:appearance-auto"
                        />
                        <svg
                          fill="none"
                          viewBox="0 0 14 14"
                          className="pointer-events-none col-start-1 row-start-1 size-3.5 self-center justify-self-center stroke-white group-has-[:disabled]:stroke-gray-950/25">
                          <path
                            d="M3 8L6 11L11 3.5"
                            strokeWidth={2}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="opacity-0 group-has-[:checked]:opacity-100"
                          />
                          <path
                            d="M3 7H11"
                            strokeWidth={2}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="opacity-0 group-has-[:indeterminate]:opacity-100"
                          />
                        </svg>
                      </div>
                    </div>
                    <label
                      htmlFor={`${brand.id}`}
                      className="text-sm text-gray-600 capitalize">
                      {brand.name}
                    </label>
                  </div>
                ))}
              </div>
            </fieldset>
          </div>

          {/* Category */}
          <div className="pt-10">
            <fieldset>
              <legend className="block text-sm font-medium text-gray-900">
                Category
              </legend>
              <div className="pt-6 space-y-3">
                {categoryIsLoading && (
                  <div className="flex flex-col gap-y-4">
                    {[1, 2, 3, 4].map((index) => (
                      <Skeleton className="h-4 w-[200px]" key={index} />
                    ))}
                  </div>
                )}
                {categories?.data.map((category) => (
                  <div key={category.id} className="flex gap-3">
                    <div className="flex items-center h-5 shrink-0">
                      <div className="grid grid-cols-1 group size-4">
                        <input
                          id={`${category.name}`}
                          checked={selectedCategories.includes(category.name)}
                          type="checkbox"
                          onChange={(e) => {
                            const isChecked = e.target.checked;
                            const updatedCategories = isChecked
                              ? [...selectedCategories, category.name]
                              : selectedCategories.filter(
                                  (val) => val !== category.name
                                );

                            setSelectedCategories(updatedCategories);
                            categoryOnChange(updatedCategories);
                          }}
                          className="col-start-1 row-start-1 bg-white border border-gray-300 rounded appearance-none checked:border-indigo-600 checked:bg-indigo-600 indeterminate:border-indigo-600 indeterminate:bg-indigo-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:border-gray-300 disabled:bg-gray-100 disabled:checked:bg-gray-100 forced-colors:appearance-auto"
                        />
                        <svg
                          fill="none"
                          viewBox="0 0 14 14"
                          className="pointer-events-none col-start-1 row-start-1 size-3.5 self-center justify-self-center stroke-white group-has-[:disabled]:stroke-gray-950/25">
                          <path
                            d="M3 8L6 11L11 3.5"
                            strokeWidth={2}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="opacity-0 group-has-[:checked]:opacity-100"
                          />
                          <path
                            d="M3 7H11"
                            strokeWidth={2}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="opacity-0 group-has-[:indeterminate]:opacity-100"
                          />
                        </svg>
                      </div>
                    </div>
                    <label
                      htmlFor={`${category.name}`}
                      className="text-sm text-gray-600 capitalize">
                      {category.name}
                    </label>
                  </div>
                ))}
              </div>
            </fieldset>
          </div>
        </form>
      </div>
    </aside>
  );
}

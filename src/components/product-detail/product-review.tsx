import { classNames } from "@/lib/utils";
import { Reviews } from "@/pages/product-detail-page";
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from "@headlessui/react";
import { StarIcon } from "@heroicons/react/20/solid";
import { Fragment } from "react";

export default function ProductReview({ reviews }: { reviews: Reviews }) {
  return (
    <div className="mx-auto mt-16 w-full max-w-2xl lg:col-span-4 lg:mt-0 lg:max-w-none">
      <TabGroup>
        <div className="border-b border-gray-200">
          <TabList className="-mb-px flex space-x-8">
            <Tab className="whitespace-nowrap border-b-2 border-transparent py-6 text-sm font-medium text-gray-700 hover:border-gray-300 hover:text-gray-800 data-[selected]:border-indigo-600 data-[selected]:text-indigo-600">
              Customer Reviews
            </Tab>
          </TabList>
        </div>
        <TabPanels as={Fragment}>
          <TabPanel className="-mb-10">
            <h3 className="sr-only">Customer Reviews</h3>

            {reviews.featured.map((review, reviewIdx) => (
              <div
                key={review.id}
                className="flex space-x-4 text-sm text-gray-500">
                <div className="flex-none py-10">
                  <img
                    alt=""
                    src={review.avatarSrc}
                    className="size-10 rounded-full bg-gray-100"
                  />
                </div>
                <div
                  className={classNames(
                    reviewIdx === 0 ? "" : "border-t border-gray-200",
                    "flex-1 py-10"
                  )}>
                  <h3 className="font-medium text-gray-900">{review.author}</h3>
                  <p>
                    <time dateTime={review.datetime}>{review.date}</time>
                  </p>

                  <div className="mt-4 flex items-center">
                    {[0, 1, 2, 3, 4].map((rating) => (
                      <StarIcon
                        key={rating}
                        aria-hidden="true"
                        className={classNames(
                          review.rating > rating
                            ? "text-yellow-400"
                            : "text-gray-300",
                          "size-5 shrink-0"
                        )}
                      />
                    ))}
                  </div>
                  <p className="sr-only">{review.rating} out of 5 stars</p>

                  <div
                    dangerouslySetInnerHTML={{ __html: review.content }}
                    className="mt-4 text-sm/6 text-gray-500"
                  />
                </div>
              </div>
            ))}
          </TabPanel>
        </TabPanels>
      </TabGroup>
    </div>
  );
}

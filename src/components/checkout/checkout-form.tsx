import { useAuth } from "@/context/auth-context";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import OrderSummary from "./order-summary";
import APIClient from "@/service/api-client";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { queryClient } from "@/main";

interface CheckoutRequest {
  name: string;
  address: string;
  city: string;
  province: string;
  postalCode: string;
  phone: string;
}

const formCheckoutSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  address: z.string().min(10, {
    message: "Address must be at least 10 characters.",
  }),
  city: z.string().min(3, {
    message: "City must be at least 3 characters.",
  }),
  province: z.string().min(3, {
    message: "Province must be at least 3 characters.",
  }),
  postalCode: z
    .string()
    .min(5, {
      message: "Postal Code must be 5 digits",
    })
    .max(5, {
      message: "Postal Code must be 5 digits",
    }),
  // .transform((val) => {
  //   if (val.length !== 5) throw new Error("Postal Code must have 5 digits");
  //   return parseInt(val);
  // }),
  phone: z
    .string()
    .min(11, {
      message: "Phone number must be between 11 to 14 digits",
    })
    .max(14, {
      message: "Phone number must be between 11 to 14 digits",
    }),
  // .transform((val) => {
  //   if (val.length < 11 && val.length > 14)
  //     throw new Error("Phone number must be between 11 to 14 digits");
  //   return parseInt(val);
  // }),
});

export default function CheckoutForm() {
  const { user } = useAuth();
  const form = useForm<z.infer<typeof formCheckoutSchema>>({
    resolver: zodResolver(formCheckoutSchema),
    defaultValues: {
      name: user?.name,
      address: "",
      city: "",
      province: "",
      postalCode: "",
      phone: "",
    },
  });

  const apiClient = new APIClient(`/transactions`);
  const { mutate, isPending } = useMutation({
    mutationFn: (data: CheckoutRequest) => {
      return apiClient.post(data, { withCredentials: true });
    },
    onSuccess: () => {
      toast.success("create transaction successfully");
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["carts"] });
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formCheckoutSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    mutate(values);
  }
  return (
    // <form>
    //   <div>
    //     <div>
    //       <h2 className="mb-4 text-lg font-medium text-gray-900">
    //         Shipping information
    //       </h2>

    //       <div className="sm:col-span-2">
    //         <div>
    //           <label
    //             htmlFor="name"
    //             className="block font-medium text-gray-700 text-sm/6">
    //             First name
    //           </label>
    //           <div className="mt-2">
    //             <input
    //               id="name"
    //               name="name"
    //               type="text"
    //               defaultValue={user?.name}
    //               autoComplete="given-name"
    //               className="block w-full px-3 py-2 text-base text-gray-900 bg-white rounded-md outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
    //             />
    //           </div>
    //         </div>

    //         <div className="sm:col-span-2">
    //           <label
    //             htmlFor="address"
    //             className="block font-medium text-gray-700 text-sm/6">
    //             Address
    //           </label>
    //           <div className="mt-2">
    //             <input
    //               id="address"
    //               name="address"
    //               type="text"
    //               autoComplete="street-address"
    //               className="block w-full px-3 py-2 text-base text-gray-900 bg-white rounded-md outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
    //             />
    //           </div>
    //         </div>

    //         <div>
    //           <label
    //             htmlFor="city"
    //             className="block font-medium text-gray-700 text-sm/6">
    //             City
    //           </label>
    //           <div className="mt-2">
    //             <input
    //               id="city"
    //               name="city"
    //               type="text"
    //               autoComplete="address-level2"
    //               className="block w-full px-3 py-2 text-base text-gray-900 bg-white rounded-md outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
    //             />
    //           </div>
    //         </div>

    //         <div>
    //           <label
    //             htmlFor="region"
    //             className="block font-medium text-gray-700 text-sm/6">
    //             State / Province
    //           </label>
    //           <div className="mt-2">
    //             <input
    //               id="region"
    //               name="region"
    //               type="text"
    //               autoComplete="address-level1"
    //               className="block w-full px-3 py-2 text-base text-gray-900 bg-white rounded-md outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
    //             />
    //           </div>
    //         </div>

    //         <div>
    //           <label
    //             htmlFor="postal-code"
    //             className="block font-medium text-gray-700 text-sm/6">
    //             Postal code
    //           </label>
    //           <div className="mt-2">
    //             <input
    //               id="postal-code"
    //               name="postal-code"
    //               type="text"
    //               autoComplete="postal-code"
    //               className="block w-full px-3 py-2 text-base text-gray-900 bg-white rounded-md outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
    //             />
    //           </div>
    //         </div>

    //         <div className="sm:col-span-2">
    //           <label
    //             htmlFor="phone"
    //             className="block font-medium text-gray-700 text-sm/6">
    //             Phone
    //           </label>
    //           <div className="mt-2">
    //             <input
    //               id="phone"
    //               name="phone"
    //               type="text"
    //               autoComplete="tel"
    //               className="block w-full px-3 py-2 text-base text-gray-900 bg-white rounded-md outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
    //             />
    //           </div>
    //         </div>
    //       </div>
    //     </div>
    //   </div>
    // </form>
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="lg:grid lg:grid-cols-2 lg:gap-x-12 xl:gap-x-16">
        <div className="flex flex-col gap-y-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input autoComplete="name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="address"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Address</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Address"
                    autoComplete="address"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="city"
            render={({ field }) => (
              <FormItem>
                <FormLabel>City</FormLabel>
                <FormControl>
                  <Input placeholder="Bekasi" autoComplete="city" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="province"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Province</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Jawa Barat"
                    autoComplete="province"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="postalCode"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Postal Code</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="12345"
                    autoComplete="postal-code"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="081234567890"
                    autoComplete="phone"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <OrderSummary isPending={isPending} />
      </form>
    </Form>
  );
}

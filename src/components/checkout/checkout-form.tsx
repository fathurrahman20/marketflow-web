import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import OrderSummary from "./order-summary";
import formCheckoutSchema from "@/schema/checkout-schema";
import useCreateTransaction from "@/hooks/useCreateTransaction";
import { CustomFormField } from "../common/common-form";
import { Form } from "../ui/form";

export default function CheckoutForm() {
  const form = useForm<z.infer<typeof formCheckoutSchema>>({
    resolver: zodResolver(formCheckoutSchema),
    defaultValues: {
      name: "",
      address: "",
      city: "",
      province: "",
      postalCode: "",
      phone: "",
    },
  });
  const { mutate, isPending } = useCreateTransaction();

  function onSubmit(values: z.infer<typeof formCheckoutSchema>) {
    mutate(values);
  }
  return (
    <div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="lg:grid lg:grid-cols-2 lg:gap-x-12 xl:gap-x-16">
          <div className="flex flex-col gap-y-4">
            {/* Name */}
            <CustomFormField name="name" control={form.control} />
            {/* Address */}
            <CustomFormField name="address" control={form.control} />
            {/* City */}
            <CustomFormField name="city" control={form.control} />
            {/* Province */}
            <CustomFormField name="province" control={form.control} />
            {/* Postal Code */}
            <CustomFormField
              name="postalCode"
              label="postal code"
              control={form.control}
            />
            {/* Phone */}
            <CustomFormField name="phone" control={form.control} />
          </div>
          <OrderSummary isPending={isPending} />
        </form>
      </Form>
      <div id="snap-container"></div>
    </div>
  );
}

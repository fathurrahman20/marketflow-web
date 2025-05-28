import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import OrderSummary from "./order-summary";
import formCheckoutSchema from "@/schema/checkout-schema";
import useCreateTransaction from "@/hooks/useCreateTransaction";
import { CustomFormField } from "../common/common-form";
import { Form } from "../ui/form";
import { useNavigate } from "react-router";
import useSnap from "@/hooks/useSnap";

export default function CheckoutForm() {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const navigate = useNavigate();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { snapEmbed } = useSnap();
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
  const { mutate, isPending, data } = useCreateTransaction();
  console.log(`Data Trx: ${JSON.stringify(data)}`);

  // if (data && status === "success") {
  //   snapEmbed(data.data.snap_token);
  // snapEmbed(data.data.snap_token, "snap-container", {
  //   onSuccess: function (result: unknown) {
  //     console.log("success", result);
  //     navigate("/order-history");
  //     // navigate(`/order-status?transaction_id=${data.data.id}`)
  //   },
  //   onPending: function (result: unknown) {
  //     console.log("pending", result);
  //     navigate("/order-history");
  //     // navigate(`/order-status?transaction_id=${data.data.id}`)
  //     // setSnapShow(false)
  //   },
  //   onClose: function () {
  //     navigate(`/order-history`);
  //     // setSnapShow(false)
  //   },
  // });
  // }

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

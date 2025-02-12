import { z } from "zod";

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
  phone: z
    .string()
    .min(11, {
      message: "Phone number must be between 11 to 14 digits",
    })
    .max(14, {
      message: "Phone number must be between 11 to 14 digits",
    }),
});

export default formCheckoutSchema;

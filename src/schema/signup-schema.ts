import { z } from "zod";
let password = "";
const signupSchema = z.object({
  name: z.string().min(3).max(25),
  email: z.string().email().min(2).max(100),
  password: z
    .string()
    .min(6)
    .max(100)
    .refine((value) => {
      password = value;
      return true;
    }),
  confirmPassword: z
    .string()
    .min(6, { message: "You must confirm your password" })
    .max(100)
    .refine((value) => value === password, "Passwords not match"),
});

export default signupSchema;

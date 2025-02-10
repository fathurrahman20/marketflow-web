import { z } from "zod";

const signinSchema = z.object({
  email: z.string().email().min(2).max(100),
  password: z.string().min(6).max(100),
});

export default signinSchema;

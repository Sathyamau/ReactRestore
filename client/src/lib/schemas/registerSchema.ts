import { z } from "zod";

const passwordValidation = new RegExp(
  /(?=^.{6,10}$)(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&amp;*()_+}{&quot;:;'?/&gt;.&lt;,])(?!.*\s).*$/
);


export const registerSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters").regex(
    passwordValidation,
    "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character"
  ),
});

export type RegisterSchema = z.infer<typeof registerSchema>;
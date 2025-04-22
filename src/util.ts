import { z } from "zod";

export const numberInString = z.string().transform((val, ctx) => {
  const parsed = Number.parseInt(val);
  if (Number.isNaN(parsed)) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: "Not a number",
    });
    return z.NEVER;
  }
  return parsed;
});

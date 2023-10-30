import * as z from "zod"

export const AttendanceRedirectTemplateValidation = z.object({
  /* validation for roll no. */
  rollNo: z.coerce.number({
    required_error: "Required",
    invalid_type_error: "Required",
  }),

  /* validation for user name */
  name: z.string().trim().min(1, { message: "Required" }),
})

export type AttendanceRedirectFormSchema = z.infer<
  typeof AttendanceRedirectTemplateValidation
>

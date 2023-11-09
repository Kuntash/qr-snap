import * as z from "zod"

export const AttendanceRedirectTemplateValidation = z.object({
  /* validation for roll no. */
  rollNo: z.coerce.number({
    required_error: "Required",
    invalid_type_error: "Required",
  }),

  /* validation for user name */
  name: z.string().trim().min(1, { message: "Required" }),

  /* 
    validation for geolocation of the user
  */
  location: z.object({
    lat: z.number(),
    lng: z.number(),
  }),
})

export type AttendanceRedirectFormSchema = z.infer<
  typeof AttendanceRedirectTemplateValidation
>

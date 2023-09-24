import * as z from "zod"

export const AttendanceTemplateValidation = z.object({
  title: z
    .string({
      required_error: "Please set a title for your QR",
    })
    .min(10, { message: "Title must be at least 10 characters long" }),
  activationDays: z
    .array(z.number())
    .min(1, { message: "Please select atleast one day of the week" }),

  activationTimes: z.object({
    fromTime: z.string().optional(),
    fromTimeOffset: z.number().optional(),
    toTime: z.string().optional(),
    toTimeOffset: z.number().optional(),
  }),

  /* validation for integrations */
  googleSheetURL: z
    .string()
    .url({ message: "Please enter a valid URL" })
    .optional(),
})

export type AttendanceFormSchema = z.infer<typeof AttendanceTemplateValidation>

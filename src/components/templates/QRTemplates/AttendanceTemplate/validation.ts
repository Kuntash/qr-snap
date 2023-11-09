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
    fromTime: z.string(),
    fromTimeOffset: z.number().optional(),
    toTime: z.string(),
    toTimeOffset: z.number().optional(),
  }),

  deactivationDate: z.string().refine((value) => {
    return new Date(value) > new Date()
  }, "Date can't be in the past"),

  /* validation for integrations */
  googleSheetURL: z
    .string()
    .url({ message: "Please enter a valid URL" })
    .optional(),

  /* validation for geofencing */
  geofence: z.object({
    north: z.number(),
    east: z.number(),
    south: z.number(),
    west: z.number(),
  }),
})

export type AttendanceFormSchema = z.infer<typeof AttendanceTemplateValidation>

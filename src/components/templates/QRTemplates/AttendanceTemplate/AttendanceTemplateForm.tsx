import React from "react"
import { useFormContext } from "react-hook-form"
import { AttendanceFormSchema } from "./validation"
import { Input } from "@main/components/ui/input"
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@main/components/ui/form"
import { Button } from "@main/components/ui/button"
import { DaySelect } from "@main/components/molecules/DaySelect"
import { Card } from "@main/components/ui/card"

export const AttendanceTemplateForm = () => {
  /* Submit form data */
  const form = useFormContext<AttendanceFormSchema>()
  console.log(form.formState.errors)
  const onSubmit = (data: AttendanceFormSchema) => {
    console.log(
      "🚀 ~ file: AttendanceTemplateForm.tsx:19 ~ onSubmit ~ data:",
      data
    )
  }
  return (
    <form
      className="flex flex-col gap-y-6"
      onSubmit={form.handleSubmit(onSubmit)}
    >
      {/* QR title input */}
      <FormField
        control={form.control}
        name="title"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Title</FormLabel>
            <FormControl>
              <Input placeholder="e.g Deep Learning" {...field} />
            </FormControl>
            <FormDescription>
              This is the name of the class that will be displayed on the QR
              code.
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
      {/* Select days of the week input */}
      <FormField
        control={form.control}
        name="activationDays"
        render={({ field: { value, onChange } }) => (
          <FormItem>
            <FormLabel>QR activation days</FormLabel>
            <FormControl>
              <DaySelect selectedDays={value} onChange={onChange} />
            </FormControl>
            <FormDescription>
              Days on which your QR code will be active
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />

      {/* Select time of the day input */}

      <FormItem>
        <FormLabel>QR activation time</FormLabel>
        <div className="flex gap-x-4">
          <FormField
            control={form.control}
            name="activationTimes.fromTime"
            render={({ field }) => (
              <Card className="p-4 flex gap-y-2 flex-col">
                <FormLabel>From:</FormLabel>
                <FormControl>
                  <Input type="time" {...field} />
                </FormControl>
                <FormDescription>QR deactivates at this time</FormDescription>
                <FormMessage />
              </Card>
            )}
          />

          <FormField
            control={form.control}
            name="activationTimes.toTime"
            render={({ field }) => (
              <Card className="p-4 flex gap-y-2 flex-col">
                <FormLabel>To:</FormLabel>
                <FormControl>
                  <Input type="time" {...field} />
                </FormControl>
                <FormDescription>QR deactivates at this time</FormDescription>
                <FormMessage />
              </Card>
            )}
          />
        </div>
      </FormItem>

      {/* Optional google spreadsheet url */}

      {/* Submit button */}

      <Button className="w-max" type="submit">
        Publish QR code
      </Button>
    </form>
  )
}

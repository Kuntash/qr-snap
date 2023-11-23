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
import { format } from "date-fns"
import { useQRTemplateContext } from "@main/context/QRTemplateContext"
import { GeofenceMapMemoized } from "@main/components/molecules/GeofenceMap/GeofenceMap"

export const AttendanceTemplateForm = (props: {
  // eslint-disable-next-line no-unused-vars
  onSubmit: (data: AttendanceFormSchema) => void
}) => {
  const { isEditing } = useQRTemplateContext()
  const { onSubmit } = props

  /* Submit form data */
  const form = useFormContext<AttendanceFormSchema>()

  console.log(form.formState.errors)
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

      {/* Select the deactivation date for the QR code */}
      <FormField
        control={form.control}
        name="deactivationDate"
        render={({ field: { onChange, value } }) => (
          <FormItem>
            <FormLabel>Class end date</FormLabel>
            <FormControl>
              <Input
                type="date"
                value={format(new Date(value), "yyyy-MM-dd")}
                onChange={(e) => {
                  onChange(e.target.value)
                }}
              />
            </FormControl>
            <FormDescription>QR deactivates at this time</FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />

      {/* Optional google spreadsheet */}
      <FormField
        control={form.control}
        name="googleSheetURL"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Google spreadsheet</FormLabel>
            <FormControl>
              <Input
                placeholder="Enter your google spreadsheet Id"
                {...field}
              />
            </FormControl>
            <FormDescription>
              Please give sheet&apos;s editor access to{" "}
              <b>qr-snap@appspot.gserviceaccount.com</b> email.
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
      {/* Optional geofencing */}
      <FormItem>
        <FormLabel>Geofence QR code access</FormLabel>
        <FormControl>
          <FormField
            control={form.control}
            name="geofence"
            render={({ field }) => (
              <Card className="p-4">
                <GeofenceMapMemoized
                  bounds={field.value}
                  onChange={field.onChange}
                />
              </Card>
            )}
          />
        </FormControl>
      </FormItem>
      {/* Optional google spreadsheet url */}

      {/* Submit button */}

      <Button className="w-max" type="submit">
        {isEditing ? "Update QR code" : "Publish QR code"}
      </Button>
    </form>
  )
}

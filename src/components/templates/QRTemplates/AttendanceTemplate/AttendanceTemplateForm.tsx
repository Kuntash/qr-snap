import React from "react"
import Router from "next/router"
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
import { GeofenceMap } from "@main/components/molecules/GeofenceMap"
import { useUpdateQRCodeMutation } from "@main/hooks/mutations/useUpdateQRCodeMutation"
import { useToast } from "@main/components/ui/use-toast"

export const AttendanceTemplateForm = () => {
  /* qr id from the router */

  const qrId = Router.query?.qrId?.toString() as string
  const { toast } = useToast()
  /* Submit form data */
  const form = useFormContext<AttendanceFormSchema>()
  const updateQRCodeMutation = useUpdateQRCodeMutation({ qrId })
  console.log(form.formState.errors)
  const onSubmit = (data: AttendanceFormSchema) => {
    updateQRCodeMutation.mutate(
      { qrId, updatePayload: data },
      {
        onSuccess: (data) => {
          /* Success toast */
        },
        onError: () => {
          /*  Error toast */
          toast({
            variant: "destructive",
            title: "Uh oh! Something went wrong.",
            description: "There was a problem with your request.",
          })
        },
      }
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
      {/* Optional geofencing */}
      <FormItem>
        <FormLabel>Geofence QR code access</FormLabel>
        <FormControl>
          <FormField
            control={form.control}
            name="geofence"
            render={({ field }) => (
              <Card className="p-4">
                <GeofenceMap path={field.value} onChange={field.onChange} />
              </Card>
            )}
          />
        </FormControl>
      </FormItem>
      {/* Optional google spreadsheet url */}

      {/* Submit button */}

      <Button className="w-max" type="submit">
        Publish QR code
      </Button>
    </form>
  )
}

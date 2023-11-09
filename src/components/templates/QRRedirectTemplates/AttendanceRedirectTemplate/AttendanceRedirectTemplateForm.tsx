import React from "react"
import { useFormContext } from "react-hook-form"
import { AttendanceRedirectFormSchema } from "./validation"
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
import Router from "next/router"
import { Loader2 } from "lucide-react"
import { useCreateQRFormVaultMutation } from "@main/hooks/mutations/useCreateQRFormVaultMutation"
import { useToast } from "@main/components/ui/use-toast"
import { useSingleQRCodeQuery } from "@main/hooks/queries/useSingleQRCodeQuery"

export const AttendanceRedirectTemplateForm = () => {
  /* qr id from the router */
  const qrId = Router.query?.qrId?.toString() as string
  const { toast } = useToast()

  const { data: singleQRCodeData } = useSingleQRCodeQuery({
    qrId: qrId as string,
  })

  const createQRFormVaultMutation = useCreateQRFormVaultMutation()
  /* Submit form data */
  const form = useFormContext<AttendanceRedirectFormSchema>()
  const onSubmit = (data: AttendanceRedirectFormSchema) => {
    const payload = {
      ...data,
      template: singleQRCodeData?.template,
      qrId,
    }

    createQRFormVaultMutation.mutate(payload, {
      onSuccess: () => {
        toast({
          description: "Your attendance has been submitted",
        })
      },
      onError: (error: any) => {
        toast({
          variant: "destructive",
          title: "Uh oh! Something went wrong.",
          description: error?.response?.data?.message,
        })
      },
    })
  }
  return (
    <form
      className="flex flex-col gap-y-6"
      onSubmit={form.handleSubmit(onSubmit)}
    >
      {/* student's name input */}
      <FormField
        control={form.control}
        name="name"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Name</FormLabel>
            <FormControl>
              <Input placeholder="e.g John Doe" {...field} />
            </FormControl>
            <FormDescription>Please enter your full name</FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
      {/* student's roll no input */}
      <FormField
        control={form.control}
        name="rollNo"
        render={({ field: { onChange, ...rest } }) => (
          <FormItem>
            <FormLabel>Roll number</FormLabel>
            <FormControl>
              <Input
                type="number"
                placeholder="e.g 123456"
                onChange={(e) => {
                  onChange(e.target.valueAsNumber)
                }}
                {...rest}
              />
            </FormControl>
            <FormDescription>Please enter your roll number</FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />

      {/* Submit button */}
      <Button
        className="w-max"
        type="submit"
        disabled={createQRFormVaultMutation.isLoading}
      >
        {createQRFormVaultMutation.isLoading && (
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
        )}
        Submit your attendance
      </Button>
    </form>
  )
}

import { zodResolver } from "@hookform/resolvers/zod"
import React from "react"
import { FormProvider, useForm } from "react-hook-form"
import {
  AttendanceFormSchema,
  AttendanceTemplateValidation,
} from "./validation"
import { AttendanceTemplateForm } from "./AttendanceTemplateForm"
import { AttendanceQRPreview } from "./AttendanceQRPreview"
import { useSingleQRCodeQuery } from "@main/hooks/queries/useSingleQRCodeQuery"
import { useUpdateQRCodeMutation } from "@main/hooks/mutations/useUpdateQRCodeMutation"
import { useToast } from "@main/components/ui/use-toast"
import { useQRTemplateContext } from "@main/context/QRTemplateContext"
import { format } from "date-fns"

export const AttendanceTemplate = () => {
  const { qrId } = useQRTemplateContext()
  const { data: qrCode } = useSingleQRCodeQuery({ qrId })
  const updateQRCodeMutation = useUpdateQRCodeMutation({ qrId })
  const { toast } = useToast()

  const { _id, ...defaultGeofence } = qrCode?.geofence ?? {}
  /* default values for edit */
  const form = useForm<AttendanceFormSchema>({
    resolver: zodResolver(AttendanceTemplateValidation),
    defaultValues: {
      title: qrCode?.title ?? "",
      activationDays: qrCode?.activationDays ?? [],
      activationTimes: qrCode?.activationTimes,
      deactivationDate:
        qrCode?.deactivationDate ?? format(new Date(), "yyyy-MM-dd"),
      ...(Object.keys(defaultGeofence).length !== 0 && {
        geofence: defaultGeofence ?? {},
      }),
    },
  })

  const onSubmit = (data: AttendanceFormSchema) => {
    const payload = {
      qrId,
      updatePayload: {
        ...data,
        template: qrCode?.template,
      },
    }

    updateQRCodeMutation.mutate(payload, {
      onSuccess: () => {
        /* Success toast */
        toast({
          description: "QR code successfully updated",
        })
      },
      onError: () => {
        /*  Error toast */
        toast({
          variant: "destructive",
          title: "Uh oh! Something went wrong.",
          description: "There was a problem with your request.",
        })
      },
    })
  }

  return (
    <FormProvider {...form}>
      <div className="flex flex-1 p-3 justify-center">
        <div className="flex max-w-6xl w-full gap-x-4">
          {/* Form */}
          <div className="flex-1">
            <h1 className="py-4 text-2xl tracking-tighter font-bold">
              Class details
            </h1>
            <AttendanceTemplateForm onSubmit={onSubmit} />
          </div>

          {/* QR Previvew */}
          <div className="flex-1 flex flex-col items-center">
            <AttendanceQRPreview />
          </div>
        </div>
      </div>
    </FormProvider>
  )
}

import { zodResolver } from "@hookform/resolvers/zod"
import React from "react"
import { FormProvider, useForm } from "react-hook-form"
import {
  AttendanceFormSchema,
  AttendanceTemplateValidation,
} from "./validation"
import { AttendanceTemplateForm } from "./AttendanceTemplateForm"
import { AttendanceQRPreview } from "./AttendanceQRPreview"
export const AttendanceTemplate = () => {
  /* TODO: default values for edit */
  const form = useForm<AttendanceFormSchema>({
    resolver: zodResolver(AttendanceTemplateValidation),
    defaultValues: {
      activationDays: [],
    },
  })

  return (
    <FormProvider {...form}>
      <div className="flex flex-1 p-3 justify-center">
        <div className="flex max-w-6xl w-full gap-x-4">
          {/* Form */}
          <div className="flex-1">
            <h1 className="py-4 text-2xl tracking-tighter font-bold">
              Class details
            </h1>
            <AttendanceTemplateForm />
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

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@main/components/ui/card"
import { useSingleQRCodeQuery } from "@main/hooks/queries/useSingleQRCodeQuery"
import { useRouter } from "next/router"
import React from "react"
import { FormProvider, useForm } from "react-hook-form"
import {
  AttendanceRedirectFormSchema,
  AttendanceRedirectTemplateValidation,
} from "./validation"
import { zodResolver } from "@hookform/resolvers/zod"
import { AttendanceRedirectTemplateForm } from "./AttendanceRedirectTemplateForm"

export const AttendanceRedirectTemplate = () => {
  const router = useRouter()
  const { qrId } = router?.query ?? {}
  const { data: singleQRCodeData } = useSingleQRCodeQuery({
    qrId: qrId as string,
  })

  const form = useForm<AttendanceRedirectFormSchema>({
    resolver: zodResolver(AttendanceRedirectTemplateValidation),
  })

  return (
    <div className="p-4 h-screen flex items-center justify-center">
      <Card className="max-w-[500px] w-full">
        <CardHeader>
          <CardTitle>{singleQRCodeData?.title}</CardTitle>
        </CardHeader>
        <CardContent>
          <FormProvider {...form}>
            <AttendanceRedirectTemplateForm />
          </FormProvider>
        </CardContent>
      </Card>
    </div>
  )
}

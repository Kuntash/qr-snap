import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@main/components/ui/card"
import { useSingleQRCodeQuery } from "@main/hooks/queries/useSingleQRCodeQuery"
import { useRouter } from "next/router"
import React, { useEffect } from "react"
import { FormProvider, useForm } from "react-hook-form"
import {
  AttendanceRedirectFormSchema,
  AttendanceRedirectTemplateValidation,
} from "./validation"
import { zodResolver } from "@hookform/resolvers/zod"
import { AttendanceRedirectTemplateForm } from "./AttendanceRedirectTemplateForm"
import { useToast } from "@main/components/ui/use-toast"

export const AttendanceRedirectTemplate = () => {
  const router = useRouter()
  const { qrId } = router?.query ?? {}
  const { toast } = useToast()
  const { data: singleQRCodeData } = useSingleQRCodeQuery({
    qrId: qrId as string,
  })

  const form = useForm<AttendanceRedirectFormSchema>({
    resolver: zodResolver(AttendanceRedirectTemplateValidation),
  })

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          form.setValue("location", {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          })
        },
        () => {
          toast({
            variant: "destructive",
            description:
              "Please allow location access and refresh the page to submit the form",
          })
        }
      )
    }
  }, [])

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

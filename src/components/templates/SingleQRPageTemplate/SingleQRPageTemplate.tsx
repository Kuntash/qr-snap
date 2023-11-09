import { Button } from "@main/components/ui/button"
import { ChevronLeft } from "lucide-react"
import { useRouter } from "next/router"
import React from "react"
import { AttendanceTemplate } from "../QRTemplates/AttendanceTemplate"
import { useSingleQRCodeQuery } from "@main/hooks/queries/useSingleQRCodeQuery"
import { QRTemplateProvider } from "@main/context/QRTemplateContext"

export const SingleQRPageTemplate = () => {
  const router = useRouter()
  const template = router?.query?.template?.toString()
  const qrId = router?.query?.qrId?.toString() as string
  const isEditing = Boolean(router?.query?.edit?.toString())
  const { isLoading: isQRCodeLoading, isError: isQRError } =
    useSingleQRCodeQuery({
      qrId,
    })

  if (isQRCodeLoading) return <p>QR code loading</p>

  if (isQRError) return <p>Oops! An error occurred</p>
  /* Redirect if QR code id doesn't exist */
  return (
    <div className="flex p-3 gap-x-4">
      {/* back button */}

      <Button
        variant="outline"
        size="icon"
        onClick={() => {
          router.push("/dashboard", undefined, {
            shallow: true,
          })
        }}
        className="flex-shrink-0"
      >
        <ChevronLeft className="h-4 w-4" />
      </Button>
      <QRTemplateProvider
        value={{
          qrId,
          isEditing,
        }}
      >
        {/* Rendering the corresponding template */}
        {template === "attendance" && <AttendanceTemplate />}
      </QRTemplateProvider>
    </div>
  )
}

import { Button } from "@main/components/ui/button"
import { ChevronLeft } from "lucide-react"
import { useRouter } from "next/router"
import React from "react"
import { AttendanceTemplate } from "../QRTemplates/AttendanceTemplate"

export const SingleQRPageTemplate = () => {
  const router = useRouter()
  const template = router?.query?.template?.toString()

  /* Redirect if QR code id doesn't exist */
  return (
    <div className="flex p-3 gap-x-4">
      {/* back button */}

      <Button
        variant="outline"
        size="icon"
        onClick={() => {
          router.back()
        }}
        className="flex-shrink-0"
      >
        <ChevronLeft className="h-4 w-4" />
      </Button>

      {/* Rendering the corresponding template */}
      {template === "attendance" && <AttendanceTemplate />}
    </div>
  )
}

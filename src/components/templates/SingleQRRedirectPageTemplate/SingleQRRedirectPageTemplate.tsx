import { useSingleQRCodeQuery } from "@main/hooks/queries/useSingleQRCodeQuery"
import { useRouter } from "next/router"
import React from "react"
import { QRRedirectTemplates } from "../QRRedirectTemplates"

export const SingleQRRedirectPageTemplate = () => {
  const router = useRouter()
  const { qrId } = router?.query ?? {}
  const { data: singleQRCodeData, isLoading: isSingleQRCodeDataLoading } =
    useSingleQRCodeQuery({
      qrId: qrId as string,
    })

  if (isSingleQRCodeDataLoading) {
    return <h1>Loader</h1>
  }

  if (
    QRRedirectTemplates?.[
      singleQRCodeData?.template as keyof typeof QRRedirectTemplates
    ]
  ) {
    return QRRedirectTemplates?.[
      singleQRCodeData?.template as keyof typeof QRRedirectTemplates
    ]
  }
  return <>Invalid QR</>
}

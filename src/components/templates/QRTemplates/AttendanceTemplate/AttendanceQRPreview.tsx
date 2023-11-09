import { Card, CardHeader } from "@main/components/ui/card"
import React from "react"
import { QRCode } from "react-qrcode-logo"
import Router from "next/router"
import { useFormContext } from "react-hook-form"
import { AttendanceFormSchema } from "./validation"
import { DAYS } from "@main/constants"
import { THEME } from "@main/constants/theme"
import { convertTimeStringTo12HourFormat } from "@main/utils/datetime"

export const AttendanceQRPreview = () => {
  const qrId = Router.query?.qrId?.toString()

  const form = useFormContext<AttendanceFormSchema>()

  const [title, activationDays, activationTime, deactivationTime] = form.watch([
    "title",
    "activationDays",
    "activationTimes.fromTime",
    "activationTimes.toTime",
  ])

  console.log(
    "🚀 ~ file: AttendanceQRPreview.tsx:16 ~ AttendanceQRPreview ~ activationTime:",
    activationTime,
    deactivationTime
  )
  const sortedActivationDays = activationDays?.sort((a, b) => a - b)

  return (
    <>
      <h1 className="text-center py-4 text-2xl tracking-tighter font-bold">
        QR code preview
      </h1>
      <Card className="flex justify-center items-center flex-col p-4">
        <CardHeader className="p-0">
          {title && (
            <h3 className="text-lg font-semibold tracking-tighter">{title}</h3>
          )}

          {sortedActivationDays?.length > 0 && (
            <p className="text-muted-foreground">
              {sortedActivationDays?.length > 1 &&
                sortedActivationDays?.map((activationDayIndex) => (
                  <> {DAYS?.[activationDayIndex as keyof typeof DAYS]},</>
                ))}
            </p>
          )}
          {(activationTime || deactivationTime) && (
            <p className="text-muted-foreground">
              {
                <>
                  {"At:  "}
                  {convertTimeStringTo12HourFormat(
                    activationTime as string
                  )} to{" "}
                  {convertTimeStringTo12HourFormat(deactivationTime as string)}
                </>
              }
            </p>
          )}
        </CardHeader>
        <QRCode value={qrId} size={380} fgColor={THEME.primary} />
      </Card>
    </>
  )
}

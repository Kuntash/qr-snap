import { Button } from "@main/components/ui/button"
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@main/components/ui/card"
import {
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogTitle,
} from "@main/components/ui/dialog"
import { Separator } from "@main/components/ui/separator"
import { QRTypes } from "@main/constants/QRTypes"
import { Loader2 } from "lucide-react"
import Router from "next/router"
import React, { useState } from "react"

export const QRTemplatesList = () => {
  const [selectedTemplate, setSelectedTemplate] = useState<
    keyof typeof QRTypes | null
  >(null)
  const [isCreatingNewQR, setIsCreatingNewQR] = useState(false)

  const createNewQR = async () => {
    setIsCreatingNewQR(true)
    /* mimic api request */
    setTimeout(() => {
      setIsCreatingNewQR(false)
      Router.push(`/dashboard/qr-id?template=${selectedTemplate}`, undefined, {
        shallow: true,
      })
    }, 500)
  }

  return (
    <>
      <DialogContent className="">
        <DialogTitle className="text-4xl">QR Templates</DialogTitle>
        <DialogDescription>
          QR templates for all your use cases
        </DialogDescription>
        <Separator className="my-2" />
        <div className="flex gap-3">
          {Object.entries(QRTypes).map(([QRType, QRTypeData]) => (
            <Card
              key={QRType}
              className={`${
                selectedTemplate === QRType && "border-primary"
              } cursor-pointer border-2 flex-1`}
              onClick={() => {
                setSelectedTemplate(QRType as keyof typeof QRTypes)
              }}
            >
              <CardHeader>
                <CardTitle className="text-lg">{QRTypeData?.label}</CardTitle>
                <CardDescription>{QRTypeData?.description}</CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
        <DialogFooter>
          <Button
            onClick={() => {
              createNewQR()
            }}
            disabled={isCreatingNewQR}
          >
            {isCreatingNewQR && (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            )}
            Confirm template
          </Button>
        </DialogFooter>
      </DialogContent>
    </>
  )
}

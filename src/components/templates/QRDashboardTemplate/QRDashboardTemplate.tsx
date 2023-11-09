import { useUser } from "@clerk/nextjs"
import { QRTemplatesList } from "@main/components/organisms/QRTemplatesList"
import { Button } from "@main/components/ui/button"
import { Dialog, DialogTrigger } from "@main/components/ui/dialog"
import { useAllQRCodesQuery } from "@main/hooks/queries/useAllQRCodesQuery"
import { Plus } from "lucide-react"
import React from "react"
import { AllQRTable } from "./AllQRTable"

export const QRDashboardTemplate = () => {
  const user = useUser()
  const { data: allQRCodes } = useAllQRCodesQuery()

  /* TODO: a good skeleton loader */
  if (!user.isLoaded) {
    return <p>Loader</p>
  }
  return (
    <div className="h-screen flex justify-center">
      <div className="flex p-3 gap-x-4 flex-col max-w-6xl w-full">
        {/* Header */}
        <section className="flex">
          <p className="text-lg tracking-tighter font-bold">QR Snap</p>
        </section>

        {/* Header section */}
        <section className="flex justify-between pt-4">
          <h1 className="text-3xl tracking-tighter font-bold">Your QR codes</h1>
          <Dialog>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Create QR
              </Button>
            </DialogTrigger>
            <QRTemplatesList />
          </Dialog>
        </section>

        {/* All QR code table section */}
        <section className="pt-4">
          {allQRCodes?.length ? <AllQRTable /> : <div>No QR codes</div>}
        </section>
      </div>
    </div>
  )
}

import { Badge } from "@main/components/ui/badge"
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@main/components/ui/table"
import { useAllQRCodesQuery } from "@main/hooks/queries/useAllQRCodesQuery"
import React from "react"
import Router from "next/router"

export const AllQRTable = () => {
  const { data: allQRCodes } = useAllQRCodesQuery()
  return (
    <Table>
      <TableCaption>Beautifully crafted QR codes</TableCaption>

      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Template</TableHead>
          <TableHead>Status</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {allQRCodes.map((qrCode: any) => (
          <TableRow
            key={qrCode?._id}
            className="cursor-pointer"
            onClick={() => {
              Router.push(
                `/dashboard/${qrCode?._id}?template=${qrCode?.template}&edit=true`,
                undefined,
                {
                  shallow: true,
                }
              )
            }}
          >
            <TableCell className="font-medium text-ellipsis overflow-hidden">
              {qrCode?.title}
            </TableCell>
            <TableCell>
              <Badge variant="outline">{qrCode?.template}</Badge>
            </TableCell>
            <TableCell>
              <Badge variant={qrCode?.isActive ? "default" : "destructive"}>
                {qrCode?.isActive ? "Active" : "Inactive"}
              </Badge>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

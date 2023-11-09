import { QRTypes } from "@main/constants/QRTypes"
import { axiosInstance } from "."
import { AttendanceFormSchema } from "@main/components/templates/QRTemplates/AttendanceTemplate/validation"

export const createQRCode = async ({
  template,
  createdBy,
}: {
  createdBy: string
  template: keyof typeof QRTypes
}) => {
  try {
    const response = await axiosInstance.post("/qrcode", {
      template,
      createdBy,
    })
    return response.data
  } catch (error) {
    console.error("createQRCode failed", error)
    throw error
  }
}

export const updateQRCode = async ({
  qrId,
  updatePayload,
}: {
  qrId: string
  updatePayload: Partial<AttendanceFormSchema> & {
    template: keyof typeof QRTypes
  }
}) => {
  try {
    const response = await axiosInstance.put(`/qrcode/${qrId}`, updatePayload)
    return response.data
  } catch (error) {
    console.error("updateQRCode failed", error)
    throw error
  }
}

export const getQRCodesByUserId = async ({ userId }: { userId: string }) => {
  try {
    const response = await axiosInstance.get(`/qrcode?userId=${userId}`)
    return response.data
  } catch (error) {
    console.error("getQRCodesByUserId failed", error)
    throw error
  }
}

export const getQRCodeDataByQRId = async ({ qrId }: { qrId: string }) => {
  try {
    const response = await axiosInstance.get(`/qrcode/${qrId}`)
    return response.data
  } catch (error) {
    console.error("getQRCodeDataByQRId failed", error)
    throw error
  }
}

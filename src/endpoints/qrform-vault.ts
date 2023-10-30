import { axiosInstance } from "."

export const createQRFormVault = async (payload: {}) => {
  try {
    const response = await axiosInstance.post("/qrform-vault", payload)
    return response.data
  } catch (error) {
    console.error("createQRFormVault failed", error)
    throw error
  }
}

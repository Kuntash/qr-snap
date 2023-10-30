import { createQRCode } from "@main/endpoints/qrcode"
import { useMutation } from "@tanstack/react-query"

export const useCreateQRCodeMutation = () => {
  return useMutation({
    mutationFn: createQRCode,
  })
}

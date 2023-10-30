import { updateQRCode } from "@main/endpoints/qrcode"
import { useMutation } from "@tanstack/react-query"

type UpdateQRCodeMutationProps = {
  qrId: string
}
export const useUpdateQRCodeMutation = (props: UpdateQRCodeMutationProps) => {
  const { qrId } = props
  return useMutation({
    mutationFn: updateQRCode,
    mutationKey: ["updateQRCode", qrId],
  })
}

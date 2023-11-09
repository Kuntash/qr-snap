import { getQRCodeDataByQRId } from "@main/endpoints/qrcode"
import { useQuery } from "@tanstack/react-query"

export const useSingleQRCodeQuery = (props: { qrId: string }) => {
  const { qrId } = props

  return useQuery({
    queryFn: () => getQRCodeDataByQRId({ qrId }),
    queryKey: ["singleQRCode", qrId],
    enabled: !!qrId,
    
  })
}

import { useUser } from "@clerk/nextjs"
import { getQRCodesByUserId } from "@main/endpoints/qrcode"
import { useQuery } from "@tanstack/react-query"

export const useAllQRCodesQuery = () => {
  const user = useUser()
  const id = user?.user?.id as string
  return useQuery({
    queryFn: () => getQRCodesByUserId({ userId: id }),
    queryKey: ["allQRCodes", id],
    enabled: !!id,
  })
}

import { useUser } from "@clerk/nextjs"
import { SingleQRPageTemplate } from "@main/components/templates/SingleQRPageTemplate"

export default function SingleQRPage() {
  const { user } = useUser()
  console.log("🚀 ~ file: [qrId].tsx:6 ~ SingleQRPage ~ user:", user)
  return <SingleQRPageTemplate />
}

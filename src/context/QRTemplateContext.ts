import { createContext, useContext } from "react"

type QRTemplateContextType = {
  qrId: string
  isEditing: boolean
}
export const QRTemplateContext = createContext<QRTemplateContextType | null>(
  null
)

export const QRTemplateProvider = QRTemplateContext.Provider

export const useQRTemplateContext = () => {
  const context = useContext(QRTemplateContext)
  if (!context) {
    throw new Error(
      "useQRTemplateContext must be used within a QRTemplateProvider"
    )
  }
  return context
}

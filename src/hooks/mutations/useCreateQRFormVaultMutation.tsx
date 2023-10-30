import { createQRFormVault } from "@main/endpoints/qrform-vault"
import { useMutation } from "@tanstack/react-query"

export const useCreateQRFormVaultMutation = () => {
  return useMutation({
    mutationFn: createQRFormVault,
  })
}

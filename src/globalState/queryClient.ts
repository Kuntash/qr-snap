import { DefaultOptions, QueryClient } from "@tanstack/react-query"

export const tanstackQueryDefaultOptions: DefaultOptions = {
  queries: {
    retry: false,
    staleTime: Infinity,
    cacheTime: Infinity,
    refetchOnWindowFocus: false,
  },
  mutations: {
    cacheTime: Infinity,
  },
}
export const queryClient = new QueryClient({
  defaultOptions: tanstackQueryDefaultOptions,
})

import "@main/styles/globals.css"
import { inter } from "@main/fonts"
import { ClerkProvider } from "@clerk/nextjs"
import type { AppProps } from "next/app"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"
import { QueryClientProvider } from "@tanstack/react-query"
import { queryClient } from "@main/globalState/queryClient"
import { Toaster } from "@main/components/ui/toaster"

export default function App({ Component, pageProps }: AppProps) {
  return (
    <main className={inter.className}>
      <ClerkProvider {...pageProps}>
        <QueryClientProvider client={queryClient}>
          <Component {...pageProps} />
          <Toaster />
          {process.env.NODE_ENV === "development" && (
            <ReactQueryDevtools initialIsOpen={false} />
          )}
        </QueryClientProvider>
      </ClerkProvider>
    </main>
  )
}

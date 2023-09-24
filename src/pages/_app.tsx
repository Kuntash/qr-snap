import "@main/styles/globals.css"
import { inter } from "@main/fonts"
import { ClerkProvider } from "@clerk/nextjs"
import type { AppProps } from "next/app"

export default function App({ Component, pageProps }: AppProps) {
  return (
    <main className={inter.className}>
      <ClerkProvider {...pageProps}>
        <Component {...pageProps} />
      </ClerkProvider>
    </main>
  )
}

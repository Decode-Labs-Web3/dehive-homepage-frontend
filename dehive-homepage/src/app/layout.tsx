import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import BackgroundEffect from "@/components/layout/background_effect"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Decode - Empowering Web3 Communities",
  description: "A decentralized ecosystem empowering builders, creators, and innovators to shape the future of Web3",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <BackgroundEffect />
        {children}
      </body>
    </html>
  )
}

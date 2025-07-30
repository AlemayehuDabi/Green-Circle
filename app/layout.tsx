import type { Metadata } from "next"
import type React from "react"
import { Geist, Geist_Mono } from "next/font/google" // Keep Geist fonts
import "./globals.css"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
})


export const metadata: Metadata = {
  title: "Ethiopia Startup",
  description: "Connecting Ethiopian entrepreneurs with investors, mentors, and supporters.",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning={true}>
      {/* Removed the problematic {" "} whitespace */}
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`} // Using Geist fonts
      >
        {children}
      </body>
    </html>
  )
}

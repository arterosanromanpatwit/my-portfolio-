import type React from "react"
import "./globals.css"
import type { Metadata } from "next"
import { Inter } from "next/font/google"

const inter = Inter({ subsets: ["latin"] })

// Update the metadata title and description

export const metadata: Metadata = {
  title: "Pablo Artero | Mechanical Engineer & Computer Scientist",
  description:
    "Personal portfolio of Pablo Artero, a mechanical engineer and computer scientist specializing in SolidWorks and CAD design",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  )
}

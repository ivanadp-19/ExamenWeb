import type React from "react"
import { AuthProvider } from "@/hooks/use-auth"
import "@/app/globals.css"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "NovaLearn - Biblioteca Virtual",
  description: "Acceso a la biblioteca virtual de NovaLearn para estudiantes",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <body>
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  )
}

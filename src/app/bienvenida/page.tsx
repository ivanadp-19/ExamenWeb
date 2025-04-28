"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/hooks/use-auth"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { BookOpen, LogOut } from "lucide-react"

export default function WelcomePage() {
  const { user, logout } = useAuth()
  const router = useRouter()

  useEffect(() => {
    // Redirigir al login si no hay usuario autenticado
    if (!user) {
      router.push("/")
    }
  }, [user, router])

  const handleLogout = () => {
    logout()
    router.push("/")
  }

  // Si no hay usuario, no renderizar el contenido principal
  if (!user) {
    return null
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#005f73] p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="flex justify-center">
            <BookOpen className="h-10 w-10 text-[#005f73]" />
          </div>
          <CardTitle className="text-2xl text-[#005f73] mt-2">Biblioteca Virtual NovaLearn</CardTitle>
          <CardDescription>Tu portal de conocimiento</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="text-center p-6 bg-gray-50 rounded-lg">
            <h2 className="text-xl font-medium text-gray-800">¡Bienvenido, {user.nombreCompleto}!</h2>
            <p className="mt-2 text-gray-600">Disfruta de tu lectura.</p>
          </div>

          <div className="p-4 border rounded-lg">
            <p className="text-sm text-gray-500 mb-1">Tu libro favorito:</p>
            <p className="font-medium text-[#005f73]">"{user.libroFavorito}"</p>
          </div>
        </CardContent>
        <CardFooter>
          <Button onClick={handleLogout} className="w-full bg-[#005f73] hover:bg-[#0a9396]" variant="default">
            <LogOut className="mr-2 h-4 w-4" />
            Cerrar Sesión
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}

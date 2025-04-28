"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/hooks/use-auth"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { BookOpen } from "lucide-react"

export default function LoginPage() {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const { login } = useAuth()
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    try {
      const success = await login(username, password)
      if (success) {
        router.push("/bienvenida")
      } else {
        setError("Usuario o contraseña incorrectos. Por favor, intenta nuevamente.")
      }
    } catch (err) {
      setError("Ocurrió un error al iniciar sesión. Por favor, intenta nuevamente.")
    }
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#005f73]">
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-lg">
        <div className="text-center">
          <div className="flex justify-center">
            <BookOpen className="h-12 w-12 text-[#005f73]" />
          </div>
          <h1 className="mt-4 text-3xl font-bold text-[#005f73]">NovaLearn</h1>
          <p className="mt-2 text-gray-600">Biblioteca Virtual</p>
        </div>

        {error && (
          <Alert variant="destructive">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          <div className="space-y-4">
            <div>
              <Label htmlFor="username" className="block text-sm font-medium">
                Nombre de Usuario
              </Label>
              <Input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                className="mt-1"
                placeholder="Ingresa tu nombre de usuario"
              />
            </div>

            <div>
              <Label htmlFor="password" className="block text-sm font-medium">
                Contraseña
              </Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="mt-1"
                placeholder="Ingresa tu contraseña"
              />
            </div>
          </div>

          <Button type="submit" className="w-full bg-[#005f73] hover:bg-[#0a9396]">
            Iniciar Sesión
          </Button>
        </form>
      </div>
    </div>
  )
}

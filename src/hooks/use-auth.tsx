"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { verificarCredenciales } from "@/lib/db"

// Definir el tipo para el usuario
interface Usuario {
  nombreCompleto: string
  libroFavorito: string
  usuario: string
}

// Definir el tipo para el contexto de autenticación
interface AuthContextType {
  user: Usuario | null
  login: (username: string, password: string) => Promise<boolean>
  logout: () => void
}

// Crear el contexto de autenticación
const AuthContext = createContext<AuthContextType | undefined>(undefined)

// Proveedor del contexto de autenticación
export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<Usuario | null>(null)

  // Verificar si hay un usuario en localStorage al cargar
  useEffect(() => {
    const storedUser = localStorage.getItem("novalearn_user")
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser))
      } catch (error) {
        console.error("Error al parsear usuario almacenado:", error)
        localStorage.removeItem("novalearn_user")
      }
    }
  }, [])

  // Función para iniciar sesión
  const login = async (username: string, password: string): Promise<boolean> => {
    try {
      const userData = await verificarCredenciales(username, password)

      if (userData) {
        setUser(userData)
        localStorage.setItem("novalearn_user", JSON.stringify(userData))
        return true
      }



      return false
    } catch (error) {
      console.error("Error durante el inicio de sesión:", error)
      return false
    }
  }

  // Función para cerrar sesión
  const logout = () => {
    setUser(null)
    localStorage.removeItem("novalearn_user")
  }

  return <AuthContext.Provider value={{ user, login, logout }}>{children}</AuthContext.Provider>
}

// Hook personalizado para usar el contexto de autenticación
export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth debe ser usado dentro de un AuthProvider")
  }
  return context
}

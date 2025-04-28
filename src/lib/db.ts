// Base de datos simulada de estudiantes
const estudiantes = [
    {
      usuario: "ana.t",
      contrasena: "libro123",
      nombreCompleto: "Ana Torres",
      libroFavorito: "Cien Años de Soledad",
    },
    {
      usuario: "marco.r",
      contrasena: "lectura456",
      nombreCompleto: "Marco Ramírez",
      libroFavorito: "El Principito",
    },
    {
      usuario: "sofia.m",
      contrasena: "novela789",
      nombreCompleto: "Sofía Morales",
      libroFavorito: "Orgullo y Prejuicio",
    },
  ]
  
  // Función para verificar credenciales
  export async function verificarCredenciales(usuario: string, contrasena: string): Promise<{ usuario: string; nombreCompleto: string; libroFavorito: string } | null> {
    // Simulamos una pequeña demora como si fuera una petición a un servidor
    return new Promise((resolve) => {
      setTimeout(() => {
        const estudianteEncontrado = estudiantes.find((e) => e.usuario === usuario && e.contrasena === contrasena)
  
        if (estudianteEncontrado) {
          // Si las credenciales son correctas, devolvemos los datos del estudiante
          // (excepto la contraseña por seguridad)
          const { contrasena, ...datosEstudiante } = estudianteEncontrado
          resolve(datosEstudiante)
        } else {
          // Si las credenciales son incorrectas, devolvemos null
          resolve(null)
        }
      }, 500) // Demora de 500ms para simular la petición
    })
  }
  
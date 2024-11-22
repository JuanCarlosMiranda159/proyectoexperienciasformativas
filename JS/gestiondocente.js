 // Función para cerrar sesión
     document.getElementById("cerrarSesionBtn").addEventListener("click", function() {
        // Eliminar el usuario del localStorage
        localStorage.removeItem("usuario");

        // Redirigir al inicio (index.html)
        window.location.href = "/index.html";
    });
    


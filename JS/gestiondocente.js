 // Función para cerrar sesión
     document.getElementById("cerrarSesionBtn").addEventListener("click", function() {
        // Eliminar el usuario del localStorage
        localStorage.removeItem("usuario");

        // Redirigir al inicio (index.html)
        window.location.href = "/index.html";
    });
     // Al cargar la página, mostramos el nombre y apellido
  window.onload = function() {
    const nombre = localStorage.getItem("nombre");
    const apellido = localStorage.getItem("apellido");

    // Verificar si el nombre y apellido están almacenados
    if (nombre && apellido) {
      document.getElementById("nombreProfesor").textContent = nombre + " " + apellido;
    } else {
      document.getElementById("nombreProfesor").textContent = "No disponible";
    }
  }

  // Función para cerrar sesión
  document.getElementById("cerrarSesionBtn").addEventListener("click", function() {
    // Eliminar el usuario del localStorage
    localStorage.removeItem("usuario");
    localStorage.removeItem("nombre");
    localStorage.removeItem("apellido");

    // Redirigir al inicio (index.html)
    window.location.href = "/index.html";
  });










    


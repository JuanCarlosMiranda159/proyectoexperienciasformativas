
// Función que se ejecuta cuando el usuario hace clic en un curso
document.querySelectorAll('.curso').forEach(function (curso) {
    curso.addEventListener('click', function () {
        // Obtener el ID del curso
        const cursoId = this.getAttribute('data-curso');

        // Verificar si el curso ya está marcado como completado
        if (this.classList.contains('completado')) {
            // Si está completado, desmarcarlo
            this.classList.remove('completado');
            localStorage.removeItem('curso_' + cursoId); // Eliminar del localStorage
        } else {
            // Si no está completado, marcarlo
            this.classList.add('completado');
            localStorage.setItem('curso_' + cursoId, 'completado'); // Guardar en localStorage
        }
    });

    // Comprobar si el curso ya está marcado como completado cuando la página se carga
    const cursoId = curso.getAttribute('data-curso');
    if (localStorage.getItem('curso_' + cursoId) === 'completado') {
        // Si el curso está marcado como completado, agregar la clase 'completado'
        curso.classList.add('completado');
    }
});

  // Obtén el botón por su ID
  const redirigirBtn = document.getElementById('redirigirBtn');

  // Añade el evento de clic al botón
  redirigirBtn.addEventListener('click', function () {
      // Redirige a la página deseada cuando el botón es clickeado
      window.location.href = '/paginasweb/gestiondocente.html'; // Aquí pones la URL de la página a la que deseas redirigir
  });


 // Función para cerrar sesión
 document.getElementById("cerrarSesionBtn").addEventListener("click", function() {
    // Eliminar el usuario del localStorage
    localStorage.removeItem("usuario");

    // Redirigir al inicio (index.html)
    window.location.href = "/index.html";
});




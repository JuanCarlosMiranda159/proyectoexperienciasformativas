// Ya puedes usar Firestore aquí (Firebase ya está configurado por la importación)
const db = firebase.firestore();

// Leer documentos para la tabla de resultados (Examen Físico)
const tabla = document.getElementById("tabla");

db.collection("examenPsicologico").onSnapshot((querySnapshot) => {
    tabla.innerHTML = ""; // Limpiar la tabla antes de agregar los resultados
    querySnapshot.forEach((doc) => {
        const data = doc.data();
        tabla.innerHTML += `
        <div class="bg-white p-4 shadow-md rounded-lg">
        <h3 class="font-bold text-lg">ID: ${doc.id}</h3>
        <p><strong>Nombre:</strong> ${data.nombre}</p>
        <p><strong>Apellido:</strong> ${data.apellido}</p>
        <p><strong>Edad:</strong> ${data.edad}</p>
        <p><strong>Peso:</strong> ${data.peso} kg</p>
        <p><strong>Memoria:</strong> ${data.memoria}</p>
        <p><strong>Atención:</strong> ${data.atencion}</p>
        <p><strong>Inteligencia Emocional:</strong> ${data.inteligencia_emocional}</p>

         <p><strong>Rendimiento Cognitivo:</strong> ${data.rendimiento_cognitivo}</p>
        <p><strong>Nivel de Estrés y Ansiedad:</strong> ${data.nivel_estres_ansiedad}</p>
        <p><strong>Percepción y Procesamiento Emocional:</strong> ${data.percepcion_procesamiento_emocional}</p>
        <p><strong>Habilidades de Resolución de Problemas:</strong> ${data.habilidades_resolucion_problemas}</p>
        <p><strong>Autoconocimiento y Motivación:</strong> ${data.autoconocimiento_motivacion}</p>
        <p><strong>Capacidades de Toma de Decisiones:</strong> ${data.capacidades_toma_decisiones}</p>
        <p><strong>Adaptabilidad al Cambio:</strong> ${data.adaptabilidad_al_cambio}</p>
        </div>

          
        `;
    });
});

 // Función para cerrar sesión
 document.getElementById("cerrarSesionBtn").addEventListener("click", function() {
    // Eliminar el usuario del localStorage
    localStorage.removeItem("usuario");

    // Redirigir al inicio (index.html)
    window.location.href = "/index.html";
});

 // Obtén el botón por su ID
 const redirigirBtn = document.getElementById('redirigirBtn');

 // Añade el evento de clic al botón
 redirigirBtn.addEventListener('click', function () {
     // Redirige a la página deseada cuando el botón es clickeado
     window.location.href = '/paginasweb/gestiondocente.html'; // Aquí pones la URL de la página a la que deseas redirigir
 });















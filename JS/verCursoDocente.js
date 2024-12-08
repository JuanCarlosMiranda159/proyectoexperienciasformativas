// Importar los módulos de Firebase
import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js';
import { getFirestore, collection, onSnapshot } from 'https://www.gstatic.com/firebasejs/9.15.0/firebase-firestore.js';

// Configuración de Firebase
const firebaseConfig = {
  apiKey: "AIzaSyApIC92oXvNBvXEwZhhA_otz9ZSUOg2D7E",
  authDomain: "gestiondocente-dece4.firebaseapp.com",
  projectId: "gestiondocente-dece4",
  storageBucket: "gestiondocente-dece4.firebasestorage.app",
  messagingSenderId: "891960766782",
  appId: "1:891960766782:web:35c6c9397772447d2afc6f",
  measurementId: "G-WETFYZ3PST"
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Referencia a la tabla del HTML
const tabla = document.getElementById('tabla');

// Consultar y mostrar los datos en Firestore
onSnapshot(collection(db, "docentes"), (querySnapshot) => {
  tabla.innerHTML = ''; // Limpiar contenido previo
  querySnapshot.forEach((doc) => {
    const { first, last, born, correo } = doc.data();
    tabla.innerHTML += `
      <tr class="border-b hover:bg-gray-100">
        <th class="px-4 py-2 text-left">${doc.id}</th>
        <td class="px-4 py-2">${first}</td>
        <td class="px-4 py-2">${last}</td>
        <td class="px-4 py-2">${born}</td>
        <td class="px-4 py-2">${correo}</td>
        <td class="px-4 py-2 space-y-1">
          <!-- Botón para Examen Psicológico -->
          <button 
            class="px-2 py-1 bg-blue-500 text-white text-sm font-medium rounded hover:bg-blue-600 transition-all"
            onclick="verExamen('psicologico', '${doc.id}')">
            Psicológico
          </button>
          <!-- Botón para Examen Físico -->
          <button 
            class="px-2 py-1 bg-green-500 text-white text-sm font-medium rounded hover:bg-green-600 transition-all"
            onclick="verExamen('fisico', '${doc.id}')">
            Físico
          </button>
          <!-- Botón para Examen de Sangre -->
          <button 
            class="px-2 py-1 bg-red-500 text-white text-sm font-medium rounded hover:bg-red-600 transition-all"
            onclick="verExamen('sangre', '${doc.id}')">
            Sangre
          </button>
          <!-- Botón para CV Docente -->
          <button 
            class="px-2 py-1 bg-purple-500 text-white text-sm font-medium rounded hover:bg-purple-600 transition-all"
            onclick="verCVDocente('${doc.id}')">
            CV Docente
          </button>
          <!-- Nuevo botón para ver Cursos del Docente -->
          <button 
            class="px-2 py-1 bg-teal-500 text-white text-sm font-medium rounded hover:bg-teal-600 transition-all"
            onclick="verCursosDocente('${doc.id}')">
            Cursos
          </button>
          <!-- Botón de Feedback -->
          <button 
            class="px-2 py-1 bg-yellow-500 text-white text-sm font-medium rounded hover:bg-yellow-600 transition-all"
            onclick="verFeedbackDocente('${doc.id}')">
            Feedback
          </button>
          <!-- Nuevo botón para ver Experiencia Previa -->
          <button 
            class="px-2 py-1 bg-indigo-500 text-white text-sm font-medium rounded hover:bg-indigo-600 transition-all"
            onclick="verExperienciaPrevia('${doc.id}')">
            Experiencia Previa
          </button>
        </td>
      </tr>`;
  });
});

// Función para manejar los botones de examen
window.verExamen = function(tipoExamen, idDocente) {
  const urlMap = {
    psicologico: `/paginasweb/administradorexamen.html?id=${idDocente}`,
    fisico: `/paginasweb/administradorxamen2.html?id=${idDocente}`,
    sangre: `/paginasweb/administradorexamen3.html?id=${idDocente}`,
  };

  if (urlMap[tipoExamen]) {
    window.location.href = urlMap[tipoExamen];
  } else {
    console.error('Tipo de examen no reconocido:', tipoExamen);
  }
};

// Función para manejar el botón de CV Docente
window.verCVDocente = function(idDocente) {
  const url = `/paginasweb/carreraprofecional.html?id=${idDocente}`;
  window.location.href = url;
};

// Nueva función para manejar el botón "Cursos"
window.verCursosDocente = function(idDocente) {
  const url = `/paginasweb/cursoscv.html?id=${idDocente}`;
  window.location.href = url;
};

// Nueva función para manejar el botón "Feedback"
window.verFeedbackDocente = function(idDocente) {
  const url = `/paginasweb/feedback.html?id=${idDocente}`; // Redirige a la página de Feedback
  window.location.href = url;
};

// Nueva función para manejar el botón "Experiencia Previa"
window.verExperienciaPrevia = function(idDocente) {
  const url = `/paginasweb/cursosculminados.html?id=${idDocente}`; // Redirige a la página de Experiencia Previa
  window.location.href = url;
};

// Función para manejar el botón regresar1 (Redirige a la página CV Docente)
const regresar1 = document.getElementById('regresar1');
if (regresar1) {
  regresar1.addEventListener('click', function () {
    window.location.href = "/paginasweb/cvdocente.html"; 
  });
} else {
  console.error('El botón con ID "regresar1" no fue encontrado.');
}

// Función para manejar el botón regresar (Redirige a la página de menú del administrador)
const regresar = document.getElementById('regresar');
if (regresar) {
  regresar.addEventListener('click', function () {
    window.location.href = "/paginasweb/menuAdministrador.html"; 
  });
} else {
  console.error('El botón con ID "regresar" no fue encontrado.');
}

// Configuración de Firebase
const firebaseConfig = {
    apiKey: "AIzaSyApIC92oXvNBvXEwZhhA_otz9ZSUOg2D7E",
    authDomain: "gestiondocente-dece4.firebaseapp.com",
    projectId: "gestiondocente-dece4",
    storageBucket: "gestiondocente-dece4.appspot.com",
    messagingSenderId: "891960766782",
    appId: "1:891960766782:web:35c6c9397772447d2afc6f",
    measurementId: "G-WETFYZ3PST"
};

// Inicializa Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

// Escuchar el evento de envío del formulario
document.getElementById('encuestaForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevenir el comportamiento por defecto del formulario

    // Obtener los valores del formulario
    const puntualidad = document.getElementById('puntualidad').value;
    const dominioCurso = document.getElementById('dominioCurso').value;
    const metodologia = document.getElementById('metodologia').value;
    const comunicacion = document.getElementById('comunicacion').value;
    const disponibilidad = document.getElementById('disponibilidad').value;
    const evaluacionGeneral = document.getElementById('evaluacionGeneral').value;
    const recomendacion = document.getElementById('recomendacion').value;
    const comentarios = document.getElementById('comentarios').value;

    // Guardar los datos en Firestore
    db.collection('encuestasDocente').add({
        puntualidad,
        dominioCurso,
        metodologia,
        comunicacion,
        disponibilidad,
        evaluacionGeneral,
        recomendacion,
        comentarios,
        fecha: firebase.firestore.FieldValue.serverTimestamp()
    })
    .then(() => {
        alert('Encuesta enviada correctamente.');
        mostrarResultados();
    })
    .catch((error) => {
        console.error('Error al enviar la encuesta: ', error);
    });
});

// Mostrar los resultados después de enviar la encuesta
function mostrarResultados() {
    document.getElementById('resultados').classList.remove('hidden');
    document.getElementById('resultadoPuntualidad').textContent = 'Puntualidad: ' + document.getElementById('puntualidad').value;
    document.getElementById('resultadoDominio').textContent = 'Dominio del curso: ' + document.getElementById('dominioCurso').value;
    document.getElementById('resultadoMetodologia').textContent = 'Metodología: ' + document.getElementById('metodologia').value;
    document.getElementById('resultadoComunicacion').textContent = 'Comunicación: ' + document.getElementById('comunicacion').value;
    document.getElementById('resultadoDisponibilidad').textContent = 'Disponibilidad: ' + document.getElementById('disponibilidad').value;
    document.getElementById('resultadoEvaluacion').textContent = 'Evaluación general: ' + document.getElementById('evaluacionGeneral').value;
    document.getElementById('resultadoRecomendacion').textContent = 'Recomendación: ' + document.getElementById('recomendacion').value;
    document.getElementById('resultadoComentario').textContent = 'Comentario: ' + document.getElementById('comentarios').value;
}

// Función de cierre de sesión
document.getElementById('cerrarSesionBtn').addEventListener('click', () => {
    firebase.auth().signOut()
        .then(() => {
            window.location.href = '/login.html'; // Redirigir a la página de login o donde sea apropiado
        })
        .catch((error) => {
            console.error('Error al cerrar sesión: ', error);
        });
});


 // Obtén el botón por su ID
 const examenfisico = document.getElementById('examenfisico');

 // Añade el evento de clic al botón
 examenfisico.addEventListener('click', function () {
     // Redirige a la página deseada cuando el botón es clickeado
     window.location.href ="/paginasweb/administradorxamen2.html"; // Aquí pones la URL de la página a la que deseas redirigir
 });


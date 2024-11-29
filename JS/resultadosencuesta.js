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

// Inicializar Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

// Función para cargar los resultados
function cargarResultados() {
    // Suponiendo que la colección 'encuestasDocente' ya tiene algunos documentos
    db.collection("encuestasDocente").orderBy("fecha", "desc").limit(1).get()
        .then((querySnapshot) => {
            if (!querySnapshot.empty) {
                const doc = querySnapshot.docs[0].data(); // Tomar el primer documento (el más reciente)

                // Mostrar los resultados
                document.getElementById('resultadoPuntualidad').textContent = 'Puntualidad: ' + doc.puntualidad;
                document.getElementById('resultadoDominio').textContent = 'Dominio del curso: ' + doc.dominioCurso;
                document.getElementById('resultadoMetodologia').textContent = 'Metodología: ' + doc.metodologia;
                document.getElementById('resultadoComunicacion').textContent = 'Comunicación: ' + doc.comunicacion;
                document.getElementById('resultadoDisponibilidad').textContent = 'Disponibilidad: ' + doc.disponibilidad;
                document.getElementById('resultadoEvaluacion').textContent = 'Evaluación general: ' + doc.evaluacionGeneral;
                document.getElementById('resultadoRecomendacion').textContent = 'Recomendación: ' + doc.recomendacion;
                document.getElementById('resultadoComentario').textContent = 'Comentario: ' + doc.comentarios;
            } else {
                alert('No hay resultados disponibles.');
            }
        })
        .catch((error) => {
            console.error('Error al obtener los resultados: ', error);
        });
}

// Llamar a la función para cargar los resultados
cargarResultados();

// Función de cierre de sesión
document.getElementById('cerrarSesionBtn').addEventListener('click', () => {
    firebase.auth().signOut()
        .then(() => {
            window.location.href = '/login.html'; // Redirigir a la página de login
        })
        .catch((error) => {
            console.error('Error al cerrar sesión: ', error);
        });
});

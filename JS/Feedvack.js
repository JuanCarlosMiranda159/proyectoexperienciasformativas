// Importar Firebase y Firestore desde su SDK modular
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.9.0/firebase-app.js";
import { getFirestore, collection, addDoc, query, orderBy, onSnapshot, doc, updateDoc, deleteDoc } from "https://www.gstatic.com/firebasejs/9.9.0/firebase-firestore.js";

// Configuración de Firebase
const firebaseConfig = {
    apiKey: "AIzaSyApIC92oXvNBvXEwZhhA_otz9ZSUOg2D7E",
    authDomain: "gestiondocente-dece4.firebaseapp.com",
    projectId: "gestiondocente-dece4",
    storageBucket: "gestiondocente-dece4.appspot.com",
    messagingSenderId: "891960766782",
    appId: "1:891960766782:web:35c6c9397772447d2afc6f",
    measurementId: "G-WETFYZ3PST",
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Variable para almacenar el ID del comentario seleccionado para edición
let comentarioEditadoId = null;

// Función para guardar comentarios de feedback administrativo
function guardarComentarios() {
    const comentarioCurso1 = document.getElementById('comentario-curso1').value;
    const comentarioCurso2 = document.getElementById('comentario-curso2').value;
    const comentarioCurso3 = document.getElementById('comentario-curso3').value;

    // Verifica que los campos no estén vacíos
    if (!comentarioCurso1 || !comentarioCurso2 || !comentarioCurso3) {
        alert("Por favor, complete todos los campos de comentario.");
        return; // Evitar guardar si hay campos vacíos
    }

    const feedbackData = {
        curso1: comentarioCurso1,
        curso2: comentarioCurso2,
        curso3: comentarioCurso3,
        fecha: new Date().toISOString(),
    };

    if (comentarioEditadoId) {
        // Si hay un comentario que se está editando, actualizamos
        const comentarioRef = doc(db, "feedbackCursos", comentarioEditadoId);
        updateDoc(comentarioRef, feedbackData)
            .then(() => {
                console.log("Comentario actualizado correctamente");
                document.querySelectorAll('textarea').forEach((textarea) => textarea.value = "");
                comentarioEditadoId = null; // Resetear el ID
                cargarComentarios(); // Recargar los comentarios
            })
            .catch((error) => {
                console.error("Error al actualizar comentario: ", error);
            });
    } else {
        // Si no estamos editando, agregamos un nuevo comentario
        addDoc(collection(db, "feedbackCursos"), feedbackData)
            .then(() => {
                console.log("Comentarios guardados correctamente");
                document.querySelectorAll('textarea').forEach((textarea) => textarea.value = "");
                cargarComentarios(); // Recargar los comentarios después de guardar
            })
            .catch((error) => {
                console.error("Error al guardar comentarios: ", error);
            });
    }
}

// Función para cargar los comentarios guardados
function cargarComentarios() {
    const comentariosTabla = document.getElementById("comentariosTabla");
    comentariosTabla.innerHTML = "";

    const q = query(collection(db, "feedbackCursos"), orderBy("fecha", "desc"));
    onSnapshot(q, (querySnapshot) => {
        querySnapshot.forEach((docSnap) => {
            const data = docSnap.data();
            const docId = docSnap.id;

            const feedbackItem = document.createElement('div');
            feedbackItem.classList.add('bg-white', 'p-6', 'rounded-lg', 'shadow-lg');

            feedbackItem.innerHTML = `
                <h4 class="text-xl font-semibold text-gray-800 mb-4">Feedback del ${new Date(data.fecha).toLocaleString()}</h4>
                <p class="text-gray-700"><strong>Curso 1 - Matemáticas Avanzadas:</strong> ${data.curso1}</p>
                <p class="text-gray-700"><strong>Curso 2 - Historia del Arte:</strong> ${data.curso2}</p>
                <p class="text-gray-700"><strong>Curso 3 - Introducción a la Programación:</strong> ${data.curso3}</p>
                <button id="editar-${docId}" class="mt-2 bg-yellow-500 text-white p-2 rounded-lg hover:bg-yellow-600 transition">Editar</button>
                <button id="eliminar-${docId}" class="mt-2 ml-2 bg-red-500 text-white p-2 rounded-lg hover:bg-red-600 transition">Eliminar</button>
            `;

            comentariosTabla.appendChild(feedbackItem);

            // Agregar event listeners a los botones de editar y eliminar
            document.getElementById(`editar-${docId}`).addEventListener('click', () => {
                editarComentario(docId, data.curso1, data.curso2, data.curso3);
            });

            document.getElementById(`eliminar-${docId}`).addEventListener('click', () => {
                eliminarComentario(docId);
            });
        });
    });
}

// Función para editar un comentario
function editarComentario(id, curso1, curso2, curso3) {
    comentarioEditadoId = id;
    document.getElementById('comentario-curso1').value = curso1;
    document.getElementById('comentario-curso2').value = curso2;
    document.getElementById('comentario-curso3').value = curso3;
}

// Función para eliminar un comentario
function eliminarComentario(id) {
    const comentarioRef = doc(db, "feedbackCursos", id);
    deleteDoc(comentarioRef)
        .then(() => {
            console.log("Comentario eliminado correctamente");
            cargarComentarios(); // Recargar los comentarios después de eliminar
        })
        .catch((error) => {
            console.error("Error al eliminar comentario: ", error);
        });
}

// Cargar los comentarios cuando la página se cargue
window.onload = cargarComentarios;

// Asignar la función al botón de guardar
document.getElementById("guardarFeedback").addEventListener("click", guardarComentarios);

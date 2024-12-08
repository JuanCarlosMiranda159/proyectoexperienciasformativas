// Importar Firebase y Firestore desde su SDK modular
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.9.0/firebase-app.js";
import { getFirestore, collection, query, orderBy, onSnapshot } from "https://www.gstatic.com/firebasejs/9.9.0/firebase-firestore.js";

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

// Función para cargar los comentarios guardados
function cargarComentarios() {
    const comentariosTabla = document.getElementById("comentariosTabla");
    comentariosTabla.innerHTML = ""; // Limpiar la tabla antes de cargar los resultados

    // Consultar los documentos de la colección "feedbackCursos"
    const q = query(collection(db, "feedbackCursos"), orderBy("fecha", "desc"));
    onSnapshot(q, (querySnapshot) => {
        querySnapshot.forEach((docSnap) => {
            const data = docSnap.data();
            const docId = docSnap.id;

            const feedbackItem = document.createElement('div');
            feedbackItem.classList.add('bg-white', 'p-6', 'rounded-lg', 'shadow-lg', 'mb-6');

            // Mostrar los comentarios en un formato similar a una tarjeta
            feedbackItem.innerHTML = `
                <h4 class="text-xl font-semibold text-gray-800 mb-4">Feedback del ${new Date(data.fecha).toLocaleString()}</h4>
                <p class="text-gray-700"><strong>Curso 1 - Matemáticas Avanzadas:</strong> ${data.curso1}</p>
                <p class="text-gray-700"><strong>Curso 2 - Historia del Arte:</strong> ${data.curso2}</p>
                <p class="text-gray-700"><strong>Curso 3 - Introducción a la Programación:</strong> ${data.curso3}</p>
            `;

            comentariosTabla.appendChild(feedbackItem);
        });
    });
}

// Cargar los comentarios cuando la página se cargue
window.onload = cargarComentarios;
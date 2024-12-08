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

// Función para cargar los resultados en la tabla
function cargarResultados() {
    const resultadosTabla = document.getElementById("resultadosTabla");

    // Limpiar la tabla antes de agregar los resultados
    resultadosTabla.innerHTML = "";

    const q = query(collection(db, "competenciasCursos"), orderBy("fecha", "desc"));
    onSnapshot(q, (querySnapshot) => {
        querySnapshot.forEach((docSnap) => {
            const data = docSnap.data();

            const row = document.createElement("tr");

            row.innerHTML = `
                <td class="py-2 px-4 border-b">${data.curso1}</td>
                <td class="py-2 px-4 border-b">${data.curso2}</td>
                <td class="py-2 px-4 border-b">${data.curso3}</td>
                <td class="py-2 px-4 border-b">${new Date(data.fecha).toLocaleString()}</td>
            `;

            resultadosTabla.appendChild(row);
        });
    });
}

// Cargar los resultados al inicio
window.onload = cargarResultados;

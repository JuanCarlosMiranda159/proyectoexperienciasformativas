// Firebase config
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.1.3/firebase-app.js";
import { getFirestore, collection, getDocs } from "https://www.gstatic.com/firebasejs/9.1.3/firebase-firestore.js";

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

// Referencia a la tabla de exámenes psicológicos
const tablaPsicologico = document.getElementById("tablaPsicologico").getElementsByTagName('tbody')[0];

// Leer los documentos de la colección "examenPsicologico"
async function obtenerExamenesPsicologicos() {
    const querySnapshot = await getDocs(collection(db, "examenPsicologico"));
    tablaPsicologico.innerHTML = "";  // Limpiar la tabla antes de agregar los datos

    querySnapshot.forEach((doc) => {
        const data = doc.data();
        const row = tablaPsicologico.insertRow();

        // Insertar las celdas en cada fila
        row.insertCell().innerText = data.nombre;
        row.insertCell().innerText = data.apellido;
        row.insertCell().innerText = data.edad;
        row.insertCell().innerText = data.memoria;
        row.insertCell().innerText = data.atencion;
        row.insertCell().innerText = data.inteligencia_emocional;
        row.insertCell().innerText = data.rendimiento_cognitivo;
        row.insertCell().innerText = data.nivel_estres_ansiedad;
        row.insertCell().innerText = data.percepcion_procesamiento_emocional;
        row.insertCell().innerText = data.habilidades_resolucion_problemas;
        row.insertCell().innerText = data.autoconocimiento_motivacion;
        row.insertCell().innerText = data.capacidades_toma_decisiones;
        row.insertCell().innerText = data.adaptabilidad_al_cambio;
    });
}

// Llamar a la función para obtener los exámenes psicológicos
obtenerExamenesPsicologicos();

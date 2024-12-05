// Configuración de Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.1.3/firebase-app.js";
import { getFirestore, collection, query, onSnapshot } from "https://www.gstatic.com/firebasejs/9.1.3/firebase-firestore.js";

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

// Inicializar Firebase con el SDK modular
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Obtener referencia de la tabla de resultados de perfil docente
const tabla5 = document.getElementById("tabla5").getElementsByTagName('tbody')[0];

// Crear una consulta a la colección "perfildocente1"
const perfilDocenteRef = collection(db, "perfildocente1");
const q = query(perfilDocenteRef);

// Leer documentos de la colección "perfildocente1"
onSnapshot(q, (querySnapshot) => {
    tabla5.innerHTML = ""; // Limpiar la tabla antes de agregar los resultados

    querySnapshot.forEach((doc) => {
        const data = doc.data();
        const row = tabla5.insertRow();  // Crear una nueva fila en la tabla

        // Insertar celdas con los datos correspondientes
        row.insertCell().innerText = data.nombre;
        row.insertCell().innerText = data.apellido;
        row.insertCell().innerText = data.edad;
        row.insertCell().innerText = data.direccion;
        row.insertCell().innerText = data.telefono;
        row.insertCell().innerText = data.correo;
        row.insertCell().innerText = data.linkedin;
        row.insertCell().innerText = data.perfil_profesional;
        row.insertCell().innerText = data.formacion_academica;
        row.insertCell().innerText = data.experiencia_profesional;
        row.insertCell().innerText = data.habilidades_tecnicas;
        row.insertCell().innerText = data.certificaciones;
        row.insertCell().innerText = data.publicaciones;
        row.insertCell().innerText = data.idiomas;
        row.insertCell().innerText = data.referencias;
    });
});

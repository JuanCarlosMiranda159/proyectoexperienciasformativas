// Firebase config
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

// Obtener referencia de la tabla de resultados de exámenes de sangre
const tabla3 = document.getElementById("tabla3").getElementsByTagName('tbody')[0];

// Crear una consulta a la colección "examenSangre"
const examenSangreRef = collection(db, "examenSangre");
const q = query(examenSangreRef);

// Leer documentos de la colección "examenSangre"
onSnapshot(q, (querySnapshot) => {
    tabla3.innerHTML = ""; // Limpiar la tabla antes de agregar los resultados

    querySnapshot.forEach((doc) => {
        const data = doc.data();
        const row = tabla3.insertRow();  // Crear una nueva fila en la tabla

        // Insertar celdas con los datos correspondientes
        row.insertCell().innerText = data.nombre;
        row.insertCell().innerText = data.apellido;
        row.insertCell().innerText = data.edad;
        row.insertCell().innerText = `${data.peso} kg`;
        row.insertCell().innerText = data.hemograma;
        row.insertCell().innerText = data.perfil_lipido;
        row.insertCell().innerText = data.glucosa;
        row.insertCell().innerText = data.funcion_hepatica;
        row.insertCell().innerText = data.funcion_renal;
        row.insertCell().innerText = data.coagulacion;
        row.insertCell().innerText = data.infecciones;
    });
});

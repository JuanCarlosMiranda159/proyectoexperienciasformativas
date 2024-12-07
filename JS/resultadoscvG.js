// Importar los módulos necesarios de Firebase
import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.0.2/firebase-app.js';
import { getFirestore, collection, getDocs } from 'https://www.gstatic.com/firebasejs/9.0.2/firebase-firestore.js';

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

// Leer documentos para la tabla de CV docente
const tabla3 = document.getElementById("tabla3");

async function loadData() {
    const querySnapshot = await getDocs(collection(db, "datosPersonales"));
    tabla3.innerHTML = ""; // Limpiar la tabla antes de agregar los resultados

    querySnapshot.forEach((doc) => {
        const data = doc.data();
        tabla3.innerHTML += `
            <div class="card">
                <h3 class="text-xl font-bold text-gray-800">ID: ${doc.id}</h3>
                <div class="mt-4">
                    <p class="text-gray-600"><strong>Nombre:</strong> ${data.nombre}</p>
                    <p class="text-gray-600"><strong>Objetivo Profesional:</strong> ${data.objetivo_profesional}</p>
                    <p class="text-gray-600"><strong>Formación Académica:</strong> ${data.formacion_academica}</p>
                    <p class="text-gray-600"><strong>Experiencia Laboral:</strong> ${data.experiencia_laboral}</p>
                    <p class="text-gray-600"><strong>Habilidades:</strong> ${data.habilidades}</p>
                    <p class="text-gray-600"><strong>Logros y Reconocimientos:</strong> ${data.logros_reconocimientos}</p>
                    <p class="text-gray-600"><strong>Idiomas:</strong> ${data.idiomas}</p>
                    <p class="text-gray-600"><strong>Otros Datos de Interés:</strong> ${data.otros_datos}</p>
                    <p class="text-gray-600"><strong>Referencias:</strong> ${data.referencias}</p>
                </div>
            </div>
        `;
    });
}

// Llamar la función para cargar los datos
loadData();
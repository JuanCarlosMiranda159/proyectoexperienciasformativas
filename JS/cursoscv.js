// Configuración de Firebase
const firebaseConfig = {
    apiKey: "AIzaSyApIC92oXvNBvXEwZhhA_otz9ZSUOg2D7E",
    authDomain: "gestiondocente-dece4.firebaseapp.com",
    projectId: "gestiondocente-dece4",
    storageBucket: "gestiondocente-dece4.firebasestorage.app",
    messagingSenderId: "891960766782",
    appId: "1:891960766782:web:35c6c9397772447d2afc6f",
    measurementId: "G-WETFYZ3PST",
};

// Inicializar Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

// Leer documentos de la colección "capacitaciones"
const tabla3 = document.getElementById("tabla3");

db.collection("capacitaciones").onSnapshot((querySnapshot) => {
    tabla3.innerHTML = "";  // Limpiar la tabla antes de agregar los resultados
    querySnapshot.forEach((doc) => {
        const data = doc.data();
        tabla3.innerHTML += `
            <tr>
                <td class="px-4 py-2">${data.nombre} ${data.apellido}</td>
                <td class="px-4 py-2">${data.fechaInicio}</td>
                <td class="px-4 py-2">${data.fechaFin}</td>
                <td class="px-4 py-2">${data.horas}</td>
                <td class="px-4 py-2">${data.curso}</td>
                <td class="px-4 py-2">${data.tipoCapacitacion}</td> <!-- Mostrar Tipo de Capacitación -->
            </tr>
        `;
    });
});
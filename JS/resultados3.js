const firebaseConfig = {
    apiKey: "AIzaSyApIC92oXvNBvXEwZhhA_otz9ZSUOg2D7E",
    authDomain: "gestiondocente-dece4.firebaseapp.com",
    projectId: "gestiondocente-dece4",
    storageBucket: "gestiondocente-dece4.firebasestorage.app",
    messagingSenderId: "891960766782",
    appId: "1:891960766782:web:35c6c9397772447d2afc6f",
    measurementId: "G-WETFYZ3PST",
};
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();


// Leer documentos para la tabla de resultados (Examen de Sangre)
const tabla3 = document.getElementById("tabla3");

db.collection("examenSangre").onSnapshot((querySnapshot) => {
    tabla3.innerHTML = ""; // Limpiar la tabla antes de agregar los resultados
    querySnapshot.forEach((doc) => {
        const data = doc.data();
        tabla3.innerHTML += `
            <div class="bg-white p-4 shadow-md rounded-lg">
                <h3 class="font-bold text-lg">ID: ${doc.id}</h3>
                <p><strong>Nombre:</strong> ${data.nombre}</p>
                <p><strong>Apellido:</strong> ${data.apellido}</p>
                <p><strong>Edad:</strong> ${data.edad}</p>
                <p><strong>Peso:</strong> ${data.peso} kg</p>
                <p><strong>Hemograma Completo:</strong> ${data.hemograma}</p>
                <p><strong>Perfil Lipídico:</strong> ${data.perfil_lipido}</p>
                <p><strong>Examen de Glucosa:</strong> ${data.glucosa}</p>
                <p><strong>Pruebas de Función Hepática:</strong> ${data.funcion_hepatica}</p>
                <p><strong>Pruebas de Función Renal:</strong> ${data.funcion_renal}</p>
                <p><strong>Pruebas de Coagulación:</strong> ${data.coagulacion}</p>
                <p><strong>Pruebas de Infecciones:</strong> ${data.infecciones}</p>
            </div>
        `;
    });
});

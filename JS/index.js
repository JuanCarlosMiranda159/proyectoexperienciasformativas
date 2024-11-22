// Importar Firebase y Firestore
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.5.0/firebase-app.js";
import { getFirestore, collection, query, where, getDocs } from "https://www.gstatic.com/firebasejs/10.5.0/firebase-firestore.js";

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

// Función de inicio de sesión
async function iniciarSesion() {
    const usuario = document.getElementById("usuario").value;
    const password = document.getElementById("password").value;

    console.log("Usuario ingresado: ", usuario);
    console.log("Contraseña ingresada: ", password);

    try {
        // Realizar la consulta en Firestore para buscar el usuario
        const q = query(collection(db, "usuarios"), where("usuario", "==", usuario));
        const docSnapshot = await getDocs(q);

        if (!docSnapshot.empty) {
            const usuarioData = docSnapshot.docs[0].data();
            console.log("Datos del usuario: ", usuarioData);

            // Verificar si la contraseña coincide
            if (usuarioData.password === password) {
                console.log("Inicio de sesión exitoso");

                // Mostrar mensaje de éxito
                document.getElementById("mensaje-exito").innerText = "Has iniciado sesión correctamente.";

                // Mostrar mensaje de usuario identificado
                alert("Usuario identificado");

                // Guardar el usuario en localStorage (para mantener la sesión activa)
                localStorage.setItem("usuario", usuario);

                // Redirigir a la página de destino después de 2 segundos
                setTimeout(() => {
                    window.location.href = "/paginasweb/gestiondocente.html"; // Cambia esto a la página de destino
                }, 2000); // Espera 2 segundos para mostrar el mensaje de éxito
            } else {
                console.log("Contraseña incorrecta");
                alert("Contraseña incorrecta");
            }
        } else {
            console.log("El usuario no está registrado");
            alert("Usuario no registrado.");
        }
    } catch (error) {
        console.error("Error al verificar el inicio de sesión:", error.message);
        alert("Error al autenticarte. Intenta nuevamente.");
    }
}

// Escuchar el evento del formulario
const loginForm = document.getElementById("loginForm");
loginForm.addEventListener("submit", (event) => {
    event.preventDefault(); // Prevenir el envío por defecto del formulario
    iniciarSesion(); // Llamar a la función para verificar el inicio de sesión
});

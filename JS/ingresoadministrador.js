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

// Función de inicio de sesión para el administrador
async function iniciarSesion() {
    const usuario = document.getElementById("usuario").value; // Obtener el usuario ingresado
    const contraseña = document.getElementById("contraseña").value; // Obtener la contraseña ingresada

    console.log("Usuario ingresado: ", usuario);
    console.log("Contraseña ingresada: ", contraseña);

    try {
        // Realizar la consulta en Firestore para buscar al administrador
        const q = query(collection(db, "administrador"), where("usuario", "==", usuario));
        const docSnapshot = await getDocs(q);

        if (!docSnapshot.empty) {
            const usuarioData = docSnapshot.docs[0].data(); // Obtener los datos del administrador
            console.log("Datos del administrador: ", usuarioData);

            // Verificar si la contraseña coincide
            if (usuarioData.password === contraseña) { // Comparar la contraseña ingresada con la de Firestore
                console.log("Inicio de sesión exitoso");

                // Mostrar mensaje de éxito
                document.getElementById("mensaje-exito").innerText = "Has iniciado sesión correctamente.";

                // Mostrar mensaje de usuario identificado
                alert("Administrador identificado");

                // Guardar el usuario en localStorage (para mantener la sesión activa)
                localStorage.setItem("usuario", usuario);

                // Redirigir a la página de administración después de 2 segundos
                setTimeout(() => {
                    window.location.href = "/paginasweb/docentes.html"; // Redirigir al panel de administración
                }, 2000); // Espera 2 segundos para mostrar el mensaje de éxito
            } else {
                console.log("Contraseña incorrecta");
                alert("Contraseña incorrecta");
            }
        } else {
            console.log("El administrador no está registrado");
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

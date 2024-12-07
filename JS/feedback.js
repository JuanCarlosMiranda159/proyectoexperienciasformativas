 // Importar Firebase
 import { initializeApp } from "https://www.gstatic.com/firebasejs/9.0.2/firebase-app.js";
 import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/9.0.2/firebase-firestore.js";

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

 // Guardar feedback
 document.getElementById("supervisionForm").addEventListener("submit", async function (e) {
     e.preventDefault();

     const data = {
         inicio: document.getElementById('inicio').value,
         proceso: document.getElementById('proceso').value,
         logrado: document.getElementById('logrado').value,
         comentarios: document.getElementById('comentarios').value,
         feedback: document.getElementById('feedback').value,
     };

     try {
         // Guardar los datos en Firestore
         await addDoc(collection(db, "feedback_docente"), data);
         alert("¡Feedback enviado con éxito!");
         // Limpiar el formulario
         document.getElementById("supervisionForm").reset();
     } catch (error) {
         console.error("Error al enviar feedback: ", error);
         alert("Hubo un error al enviar el feedback. Inténtalo nuevamente.");
     }
 });
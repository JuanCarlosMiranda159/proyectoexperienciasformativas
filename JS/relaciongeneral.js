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

       // Leer documentos de Firebase y agregar a la tabla
       const tabla2 = document.getElementById("tabla2").getElementsByTagName('tbody')[0];

       async function obtenerExamenes() {
           const querySnapshot = await getDocs(collection(db, "examenFisico"));
           tabla2.innerHTML = "";  // Limpiar la tabla antes de agregar los datos

           querySnapshot.forEach((doc) => {
               const data = doc.data();
               const row = tabla2.insertRow();

               // Insertar las celdas en cada fila
               row.insertCell().innerText = data.nombre;
               row.insertCell().innerText = data.apellido;
               row.insertCell().innerText = data.edad;
               row.insertCell().innerText = `${data.peso} kg`;
               row.insertCell().innerText = data.valoracionGeneralSalud;
               row.insertCell().innerText = data.medicionParametrosBasicos;
               row.insertCell().innerText = data.evaluacionCardiovascular;
               row.insertCell().innerText = data.examenMuscularArticular;
               row.insertCell().innerText = data.pruebasFlexibilidadEquilibrio;
               row.insertCell().innerText = data.examenPostura;
               row.insertCell().innerText = data.evaluacionRespiratoria;
               row.insertCell().innerText = data.examenVisualAuditivo;
               row.insertCell().innerText = data.examenSaludMental;
               row.insertCell().innerText = data.pruebaResistenciaFisica;
               row.insertCell().innerText = data.analisisHabitosVida;
               row.insertCell().innerText = data.pruebasAdicionales;
           });
       }

       obtenerExamenes();  // Llamar a la función para obtener los exámenes
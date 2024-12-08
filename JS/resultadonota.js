 // Importar Firebase y Firestore desde su SDK modular
        import { initializeApp } from "https://www.gstatic.com/firebasejs/9.9.0/firebase-app.js";
        import { getFirestore, collection, addDoc, query, orderBy, onSnapshot } from "https://www.gstatic.com/firebasejs/9.9.0/firebase-firestore.js";

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

        // Función para enviar los comentarios seleccionados
        function enviarCompetencias() {
            // Obtener las selecciones de los radios
            const competenciaCurso1 = document.querySelector('input[name="competencia-curso1"]:checked')?.value;
            const competenciaCurso2 = document.querySelector('input[name="competencia-curso2"]:checked')?.value;
            const competenciaCurso3 = document.querySelector('input[name="competencia-curso3"]:checked')?.value;

            // Verificar que todas las competencias estén seleccionadas
            if (!competenciaCurso1 || !competenciaCurso2 || !competenciaCurso3) {
                alert("Por favor, seleccione una opción para cada curso.");
                return; // Evitar guardar si falta alguna selección
            }

            // Crear el objeto de datos con las selecciones
            const feedbackData = {
                curso1: competenciaCurso1,
                curso2: competenciaCurso2,
                curso3: competenciaCurso3,
                fecha: new Date().toISOString(),
            };

            // Agregar el documento en Firestore
            addDoc(collection(db, "competenciasCursos"), feedbackData)
                .then(() => {
                    alert("Competencias guardadas correctamente.");
                })
                .catch((error) => {
                    console.error("Error al guardar las competencias: ", error);
                });
        }

        // Cargar los resultados guardados en la tabla
        function cargarResultados() {
            const resultadosTabla = document.getElementById("resultadosTabla");
            resultadosTabla.innerHTML = ""; // Limpiar la tabla antes de cargar los nuevos resultados

            const q = query(collection(db, "competenciasCursos"), orderBy("fecha", "desc"));
            onSnapshot(q, (querySnapshot) => {
                querySnapshot.forEach((docSnap) => {
                    const data = docSnap.data();

                    const row = document.createElement("tr");

                    row.innerHTML = `
                        <td class="py-2 px-4 border-b">${data.curso1}</td>
                        <td class="py-2 px-4 border-b">${data.curso2}</td>
                        <td class="py-2 px-4 border-b">${data.curso3}</td>
                        <td class="py-2 px-4 border-b">${new Date(data.fecha).toLocaleString()}</td>
                    `;

                    resultadosTabla.appendChild(row);
                });
            });
        }

        // Asignar el evento de clic al botón
        document.getElementById("enviarFeedback").addEventListener("click", enviarCompetencias);

        // Cargar los resultados al inicio
        window.onload = cargarResultados;
      // Configuración de Firebase
      const firebaseConfig = {
        apiKey: "AIzaSyApIC92oXvNBvXEwZhhA_otz9ZSUOg2D7E",
        authDomain: "gestiondocente-dece4.firebaseapp.com",
        projectId: "gestiondocente-dece4",
        storageBucket: "gestiondocente-dece4.appspot.com",
        messagingSenderId: "891960766782",
        appId: "1:891960766782:web:35c6c9397772447d2afc6f",
        measurementId: "G-WETFYZ3PST"
    };

    // Inicializar Firebase
    firebase.initializeApp(firebaseConfig);
    const db = firebase.firestore();

    // Guardar documento con los datos previos, incluyendo el método de pago de sueldo
    function guardarDatosPrevios() {
        const data = {
            nombre: document.getElementById('nombreDocente').value,
            formacionAcademica: document.getElementById('formacionAcademica').value,
            experienciaPrevia: document.getElementById('experienciaPrevia').value,
            proyectos: document.getElementById('proyectos').value,
            metodoPagoSueldo: document.getElementById('metodoPagoSueldo').value // Guardar el método de pago
        };

        db.collection("datosPrevios").add(data)
            .then(() => {
                console.log("Datos previos guardados");
                limpiarFormulario();
            })
            .catch((error) => console.error("Error al guardar datos previos:", error));
    }

    // Limpiar formulario después de guardar
    function limpiarFormulario() {
        document.getElementById('nombreDocente').value = '';
        document.getElementById('formacionAcademica').value = '';
        document.getElementById('experienciaPrevia').value = '';
        document.getElementById('proyectos').value = '';
        document.getElementById('metodoPagoSueldo').value = '';
    }

    // Leer documentos de la base de datos
    const tablaDatosPrevios = document.getElementById("tablaDatosPrevios");
    db.collection("datosPrevios").onSnapshot((querySnapshot) => {
        tablaDatosPrevios.innerHTML = "";
        querySnapshot.forEach((doc) => {
            const data = doc.data();
            tablaDatosPrevios.innerHTML += `
                <tr>
                    <td>${doc.id}</td>
                    <td>${data.nombre}</td>
                    <td>${data.formacionAcademica}</td>
                    <td>${data.experienciaPrevia}</td>
                    <td>${data.proyectos}</td>
                    <td>${data.metodoPagoSueldo}</td> <!-- Mostrar el método de pago -->
                    <td>
                        <button onclick="eliminarDatosPrevios('${doc.id}')">Eliminar</button>
                        <button onclick="editarDatosPrevios('${doc.id}', '${data.nombre}', '${data.formacionAcademica}', '${data.experienciaPrevia}', '${data.proyectos}', '${data.metodoPagoSueldo}')">Editar</button>
                    </td>
                </tr>
            `;
        });
    });

    // Eliminar documento
    function eliminarDatosPrevios(id) {
        db.collection("datosPrevios").doc(id).delete()
            .then(() => {
                console.log("Datos previos eliminados");
            })
            .catch((error) => console.error("Error al eliminar datos previos:", error));
    }

    // Editar documento
    function editarDatosPrevios(id, nombre, formacionAcademica, experienciaPrevia, proyectos, metodoPagoSueldo) {
        document.getElementById("nombreDocente").value = nombre;
        document.getElementById("formacionAcademica").value = formacionAcademica;
        document.getElementById("experienciaPrevia").value = experienciaPrevia;
        document.getElementById("proyectos").value = proyectos;
        document.getElementById("metodoPagoSueldo").value = metodoPagoSueldo; // Establecer el método de pago

        const boton = document.getElementById("boton");
        boton.textContent = "Actualizar";

        boton.onclick = () => {
            const dataActualizada = {
                nombre: document.getElementById('nombreDocente').value,
                formacionAcademica: document.getElementById('formacionAcademica').value,
                experienciaPrevia: document.getElementById('experienciaPrevia').value,
                proyectos: document.getElementById('proyectos').value,
                metodoPagoSueldo: document.getElementById('metodoPagoSueldo').value // Actualizar el método de pago
            };

            db.collection("datosPrevios").doc(id).update(dataActualizada)
                .then(() => {
                    console.log("Datos previos actualizados");
                    boton.textContent = "Guardar";
                    limpiarFormulario();
                })
                .catch((error) => console.error("Error al actualizar datos previos:", error));
        };
    }

    // Guardar los datos cuando el formulario es enviado
    document.getElementById("formDatosPrevios").addEventListener("submit", function(event) {
        event.preventDefault();
        guardarDatosPrevios();
    });
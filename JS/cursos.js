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
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

// Guardar documento
function guardar() {
    const data = {
        nombre: document.getElementById('nombre').value,
        apellido: document.getElementById('apellido').value,
        fechaInicio: document.getElementById('fechaInicio').value,
        fechaFin: document.getElementById('fechaFin').value,
        horas: document.getElementById('horas').value,
        curso: document.getElementById('curso').value,
        tipoCapacitacion: document.getElementById('tipoCapacitacion').value // Nuevo campo
    };

    db.collection("capacitaciones").add(data)
        .then(() => {
            console.log("Capacitación agregada");
            limpiarFormulario();
        })
        .catch((error) => console.error("Error al agregar capacitación:", error));
}

// Limpiar formulario después de guardar
function limpiarFormulario() {
    document.getElementById('nombre').value = '';
    document.getElementById('apellido').value = '';
    document.getElementById('fechaInicio').value = '';
    document.getElementById('fechaFin').value = '';
    document.getElementById('horas').value = '';
    document.getElementById('curso').value = '';
    document.getElementById('tipoCapacitacion').value = ''; // Limpiar el tipo de capacitación
}

// Leer documentos de la base de datos
const tabla2 = document.getElementById("tabla2");
firebase.firestore().collection("capacitaciones").onSnapshot((querySnapshot) => {
    tabla2.innerHTML = "";
    querySnapshot.forEach((doc) => {
        const data = doc.data();
        tabla2.innerHTML += `
            <tr>
                <td>${data.nombre} ${data.apellido}</td>
                <td>${data.fechaInicio}</td>
                <td>${data.fechaFin}</td>
                <td>${data.horas}</td>
                <td>${data.curso}</td>
                <td>${data.tipoCapacitacion}</td> <!-- Mostrar tipo de capacitación -->
                <td>
                    <button onclick="eliminar('${doc.id}')">Eliminar</button>
                    <button onclick="editar('${doc.id}', '${data.nombre}', '${data.apellido}', '${data.fechaInicio}', '${data.fechaFin}', '${data.horas}', '${data.curso}', '${data.tipoCapacitacion}')">Editar</button>
                </td>
            </tr>
        `;
    });
});

// Eliminar documento
function eliminar(id) {
    firebase.firestore().collection("capacitaciones").doc(id).delete()
        .then(() => {
            console.log("Capacitación eliminada");
        })
        .catch((error) => console.error("Error al eliminar capacitación:", error));
}

// Editar documento
function editar(id, nombre, apellido, fechaInicio, fechaFin, horas, curso, tipoCapacitacion) {
    document.getElementById("nombre").value = nombre;
    document.getElementById("apellido").value = apellido;
    document.getElementById("fechaInicio").value = fechaInicio;
    document.getElementById("fechaFin").value = fechaFin;
    document.getElementById("horas").value = horas;
    document.getElementById("curso").value = curso;
    document.getElementById("tipoCapacitacion").value = tipoCapacitacion; // Rellenar el tipo de capacitación

    const boton = document.getElementById("boton");
    boton.textContent = "Actualizar";

    boton.onclick = () => {
        const dataActualizada = {
            nombre: document.getElementById('nombre').value,
            apellido: document.getElementById('apellido').value,
            fechaInicio: document.getElementById('fechaInicio').value,
            fechaFin: document.getElementById('fechaFin').value,
            horas: document.getElementById('horas').value,
            curso: document.getElementById('curso').value,
            tipoCapacitacion: document.getElementById('tipoCapacitacion').value // Incluir tipo de capacitación
        };

        firebase.firestore().collection("capacitaciones").doc(id).update(dataActualizada)
            .then(() => {
                console.log("Capacitación actualizada");
                boton.textContent = "Guardar";
                limpiarFormulario();
            })
            .catch((error) => console.error("Error al actualizar capacitación:", error));
    };
}

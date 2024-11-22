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
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

// Guardar documento con información del CV
function guardar() {
    const data = {
        nombre: document.getElementById('nombre').value,
        apellido: document.getElementById('apellido').value,
        edad: document.getElementById('edad').value,
        direccion: document.getElementById('direccion').value,
        telefono: document.getElementById('telefono').value,
        correo: document.getElementById('correo').value,
        linkedin: document.getElementById('linkedin').value,
        perfil_profesional: document.getElementById('perfil_profesional').value,

        formacion_academica: document.getElementById('formacion_academica').value,
        experiencia_profesional: document.getElementById('experiencia_profesional').value,

        habilidades_tecnicas: document.getElementById('habilidades_tecnicas').value,
        certificaciones: document.getElementById('certificaciones').value,
        publicaciones: document.getElementById('publicaciones').value,

        idiomas: document.getElementById('idiomas').value,
        referencias: document.getElementById('referencias').value,
    };

    db.collection("perfildocente1").add(data)
        .then(() => {
            console.log("CV de docente agregado");
            document.querySelectorAll("input").forEach((input) => (input.value = "")); // Limpiar los campos
        })
        .catch((error) => console.error("Error al agregar CV:", error));
}

// Leer documentos y mostrar los detalles del CV
const tabla = document.getElementById("tabla");
db.collection("perfildocente1").onSnapshot((querySnapshot) => {
    tabla.innerHTML = "";  // Limpiar la tabla
    querySnapshot.forEach((doc) => {
        const data = doc.data();
        tabla.innerHTML += `
            <div class="bg-white p-4 shadow-md rounded-lg">
                <h3 class="font-bold text-lg">ID: ${doc.id}</h3>
                <p><strong>Nombre:</strong> ${data.nombre}</p>
                <p><strong>Apellido:</strong> ${data.apellido}</p>
                <p><strong>Edad:</strong> ${data.edad}</p>
                <p><strong>Dirección:</strong> ${data.direccion}</p>
                <p><strong>Teléfono:</strong> ${data.telefono}</p>
                <p><strong>Correo:</strong> ${data.correo}</p>
                <p><strong>LinkedIn:</strong> ${data.linkedin}</p>
                <p><strong>Perfil Profesional:</strong> ${data.perfil_profesional}</p>
                
                <p><strong>Formación Académica:</strong> ${data.formacion_academica}</p>
                <p><strong>Experiencia Profesional:</strong> ${data.experiencia_profesional}</p>
                <p><strong>Habilidades Técnicas:</strong> ${data.habilidades_tecnicas}</p>
                <p><strong>Certificaciones:</strong> ${data.certificaciones}</p>
                <p><strong>Publicaciones:</strong> ${data.publicaciones}</p>
                <p><strong>Idiomas:</strong> ${data.idiomas}</p>
                <p><strong>Referencias:</strong> ${data.referencias}</p>
                
                <div class="mt-4">
                    <button class="bg-red-500 text-white px-3 py-1 rounded" onclick="eliminar('${doc.id}')">Eliminar</button>
                    <button class="bg-yellow-500 text-white px-3 py-1 rounded" onclick="editar('${doc.id}', '${data.nombre}', '${data.apellido}', '${data.edad}', '${data.direccion}', '${data.telefono}', '${data.correo}', '${data.linkedin}', '${data.perfil_profesional}', '${data.formacion_academica}', '${data.experiencia_profesional}', '${data.habilidades_tecnicas}', '${data.certificaciones}', '${data.publicaciones}', '${data.idiomas}', '${data.referencias}')">Editar</button>
                </div>
            </div>`;
    });
});

// Eliminar documentos
function eliminar(id) {
    db.collection("perfildocente1").doc(id).delete().then(() => {
        console.log("CV eliminado");
    }).catch((error) => console.error("Error al eliminar:", error));
}

// Editar documentos con los nuevos campos del CV
function editar(id, nombre, apellido, edad, direccion, telefono, correo, linkedin, perfil_profesional, formacion_academica, experiencia_profesional, habilidades_tecnicas, certificaciones, publicaciones, idiomas, referencias) {
    // Asignamos los valores a los inputs correspondientes
    document.getElementById("nombre").value = nombre;
    document.getElementById("apellido").value = apellido;
    document.getElementById("edad").value = edad;
    document.getElementById("direccion").value = direccion;
    document.getElementById("telefono").value = telefono;
    document.getElementById("correo").value = correo;
    document.getElementById("linkedin").value = linkedin;
    document.getElementById("perfil_profesional").value = perfil_profesional;
    document.getElementById("formacion_academica").value = formacion_academica;
    document.getElementById("experiencia_profesional").value = experiencia_profesional;
    document.getElementById("habilidades_tecnicas").value = habilidades_tecnicas;
    document.getElementById("certificaciones").value = certificaciones;
    document.getElementById("publicaciones").value = publicaciones;
    document.getElementById("idiomas").value = idiomas;
    document.getElementById("referencias").value = referencias;

    // Cambiar el texto y la acción del botón para actualizar
    const boton = document.getElementById("boton");
    boton.textContent = "Actualizar";
    
    boton.onclick = () => {
        // Tomamos los valores actuales de los inputs
        const nombreActualizado = document.getElementById("nombre").value;
        const apellidoActualizado = document.getElementById("apellido").value;
        const edadActualizada = document.getElementById("edad").value;
        const direccionActualizada = document.getElementById("direccion").value;
        const telefonoActualizado = document.getElementById("telefono").value;
        const correoActualizado = document.getElementById("correo").value;
        const linkedinActualizado = document.getElementById("linkedin").value;
        const perfilProfesionalActualizado = document.getElementById("perfil_profesional").value;
        const formacionAcademicaActualizada = document.getElementById("formacion_academica").value;
        const experienciaProfesionalActualizada = document.getElementById("experiencia_profesional").value;
        const habilidadesTecnicasActualizadas = document.getElementById("habilidades_tecnicas").value;
        const certificacionesActualizadas = document.getElementById("certificaciones").value;
        const publicacionesActualizadas = document.getElementById("publicaciones").value;
        const idiomasActualizados = document.getElementById("idiomas").value;
        const referenciasActualizadas = document.getElementById("referencias").value;

        // Actualizamos el documento en Firestore con los nuevos valores
        db.collection("perfildocente1").doc(id).update({
            nombre: nombreActualizado,
            apellido: apellidoActualizado,
            edad: edadActualizada,
            direccion: direccionActualizada,
            telefono: telefonoActualizado,
            correo: correoActualizado,
            linkedin: linkedinActualizado,
            perfil_profesional: perfilProfesionalActualizado,
            formacion_academica: formacionAcademicaActualizada,
            experiencia_profesional: experienciaProfesionalActualizada,
            habilidades_tecnicas: habilidadesTecnicasActualizadas,
            certificaciones: certificacionesActualizadas,
            publicaciones: publicacionesActualizadas,
            idiomas: idiomasActualizados,
            referencias: referenciasActualizadas
        }).then(() => {
            console.log("CV actualizado");
            boton.textContent = "Guardar";  // Cambiar el texto del botón a "Guardar"
            document.querySelectorAll("input").forEach((input) => input.value = "");  // Limpiar los inputs
        }).catch((error) => console.error("Error al actualizar:", error));
    };
}

// Función para cerrar sesión
document.getElementById("cerrarSesionBtn").addEventListener("click", function() {
    // Eliminar el usuario del localStorage
    localStorage.removeItem("usuario");

    // Redirigir a la página de inicio de sesión
    window.location.href = "login.html";
});

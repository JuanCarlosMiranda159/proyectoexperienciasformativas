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

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

// Guardar documento
function guardar() {
    const data = {
        nombre: document.getElementById('nombre').value,
        objetivo_profesional: document.getElementById('objetivo_profesional').value,
        formacion_academica: document.getElementById('formacion_academica').value,
        experiencia_laboral: document.getElementById('experiencia_laboral').value,
        habilidades: document.getElementById('habilidades').value,
        logros_reconocimientos: document.getElementById('logros_reconocimientos').value,
        idiomas: document.getElementById('idiomas').value,
        otros_datos: document.getElementById('otros_datos').value,
        referencias: document.getElementById('referencias').value,
    };

    db.collection("datosPersonales").add(data)
        .then(() => {
            console.log("Datos personales guardados");
            document.querySelectorAll("input").forEach((input) => input.value = "");
        })
        .catch((error) => console.error("Error al agregar datos:", error));
}

// Leer documentos
const tabla3 = document.getElementById("tabla3");
db.collection("datosPersonales").onSnapshot((querySnapshot) => {
    tabla3.innerHTML = "";
    querySnapshot.forEach((doc) => {
        const data = doc.data();
        tabla3.innerHTML += `
            <div class="bg-white p-4 shadow-md rounded-lg">
                <h3 class="font-bold text-lg">ID: ${doc.id}</h3>
                <p><strong>Nombre:</strong> ${data.nombre}</p>
                <p><strong>Objetivo Profesional:</strong> ${data.objetivo_profesional}</p>
                <p><strong>Formación Académica:</strong> ${data.formacion_academica}</p>
                <p><strong>Experiencia Laboral:</strong> ${data.experiencia_laboral}</p>
                <p><strong>Habilidades:</strong> ${data.habilidades}</p>
                <p><strong>Logros y Reconocimientos:</strong> ${data.logros_reconocimientos}</p>
                <p><strong>Idiomas:</strong> ${data.idiomas}</p>
                <p><strong>Otros Datos de Interés:</strong> ${data.otros_datos}</p>
                <p><strong>Referencias:</strong> ${data.referencias}</p>
                <div class="mt-4">
                    <button class="bg-red-500 text-white px-3 py-1 rounded" onclick="eliminar('${doc.id}')">Eliminar</button>
                    <button class="bg-yellow-500 text-white px-3 py-1 rounded" onclick="editar('${doc.id}', '${data.nombre}', '${data.objetivo_profesional}', '${data.formacion_academica}', '${data.experiencia_laboral}', '${data.habilidades}', '${data.logros_reconocimientos}', '${data.idiomas}', '${data.otros_datos}', '${data.referencias}')">Editar</button>
                </div>
            </div>`;
    });
});

// Eliminar documento
function eliminar(id) {
    db.collection("datosPersonales").doc(id).delete().then(() => {
        console.log("Documento eliminado");
    }).catch((error) => console.error("Error al eliminar:", error));
}

// Editar documento
function editar(id, nombre, objetivo_profesional, formacion_academica, experiencia_laboral, habilidades, logros_reconocimientos, idiomas, otros_datos, referencias) {
    document.getElementById("nombre").value = nombre;
    document.getElementById("objetivo_profesional").value = objetivo_profesional;
    document.getElementById("formacion_academica").value = formacion_academica;
    document.getElementById("experiencia_laboral").value = experiencia_laboral;
    document.getElementById("habilidades").value = habilidades;
    document.getElementById("logros_reconocimientos").value = logros_reconocimientos;
    document.getElementById("idiomas").value = idiomas;
    document.getElementById("otros_datos").value = otros_datos;
    document.getElementById("referencias").value = referencias;

    eliminar(id);
}

// Regresar
const regresar = document.getElementById('regresar');
regresar.addEventListener('click', function () {
    window.location.href = "/paginasweb/verCursoDocente.html";
});

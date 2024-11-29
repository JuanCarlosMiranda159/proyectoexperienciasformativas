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
        apellido: document.getElementById('apellido').value,
        edad: document.getElementById('edad').value,
        peso: document.getElementById('peso').value,
        hemograma: document.getElementById('hemograma').value,
        perfil_lipido: document.getElementById('perfil_lipido').value,
        glucosa: document.getElementById('glucosa').value,
        funcion_hepatica: document.getElementById('funcion_hepatica').value,
        funcion_renal: document.getElementById('funcion_renal').value,
        coagulacion: document.getElementById('coagulacion').value,
        infecciones: document.getElementById('infecciones').value,
    };

    db.collection("examenSangre").add(data)
        .then(() => {
            console.log("Examen médico agregado");
            document.querySelectorAll("input").forEach((input) => input.value = "");
        })
        .catch((error) => console.error("Error al agregar examen:", error));
}

// Leer documentos
const tabla3 = document.getElementById("tabla3");
db.collection("examenSangre").onSnapshot((querySnapshot) => {
    tabla3.innerHTML = "";
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
                <div class="mt-4">
                    <button class="bg-red-500 text-white px-3 py-1 rounded" onclick="eliminar('${doc.id}')">Eliminar</button>
                    <button class="bg-yellow-500 text-white px-3 py-1 rounded" onclick="editar('${doc.id}', '${data.nombre}', '${data.apellido}', '${data.edad}', '${data.peso}', '${data.hemograma}', '${data.perfil_lipido}', '${data.glucosa}', '${data.funcion_hepatica}', '${data.funcion_renal}', '${data.coagulacion}', '${data.infecciones}')">Editar</button>
                </div>
            </div>`;
    });
});

// Eliminar documento
function eliminar(id) {
    db.collection("examenSangre").doc(id).delete().then(() => {
        console.log("Documento eliminado");
    }).catch((error) => console.error("Error al eliminar:", error));
}

// Editar documento
function editar(id, nombre, apellido, edad, peso, hemograma, perfil_lipido, glucosa, funcion_hepatica, funcion_renal, coagulacion, infecciones) {
    document.getElementById("nombre").value = nombre;
    document.getElementById("apellido").value = apellido;
    document.getElementById("edad").value = edad;
    document.getElementById("peso").value = peso;
    document.getElementById("hemograma").value = hemograma;
    document.getElementById("perfil_lipido").value = perfil_lipido;
    document.getElementById("glucosa").value = glucosa;
    document.getElementById("funcion_hepatica").value = funcion_hepatica;
    document.getElementById("funcion_renal").value = funcion_renal;
    document.getElementById("coagulacion").value = coagulacion;
    document.getElementById("infecciones").value = infecciones;

    eliminar(id);
}
  // Obtén el botón por su ID
  const examenfisico = document.getElementById('examenfisico');

  // Añade el evento de clic al botón
  examenfisico.addEventListener('click', function () {
      // Redirige a la página deseada cuando el botón es clickeado
      window.location.href ="/paginasweb/administradorxamen2.html"; // Aquí pones la URL de la página a la que deseas redirigir
  });
   // Obtén el botón por su ID
   const encuestadeldocente = document.getElementById('encuestadeldocente');

   // Añade el evento de clic al botón
   encuestadeldocente.addEventListener('click', function () {
       // Redirige a la página deseada cuando el botón es clickeado
       window.location.href ="/paginasweb/encuestadeldocente.html"; // Aquí pones la URL de la página a la que deseas redirigir
   });
  
  
 
 
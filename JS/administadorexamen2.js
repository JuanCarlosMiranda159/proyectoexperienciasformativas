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

// Guardar documento
function guardar() {
    const data = {
        nombre: document.getElementById('nombre').value,
        apellido: document.getElementById('apellido').value,
        edad: document.getElementById('edad').value,
        peso: document.getElementById('peso').value,
        valoracionGeneralSalud: document.getElementById('valoracionGeneralSalud').value,
        medicionParametrosBasicos: document.getElementById('medicionParametrosBasicos').value,
        evaluacionCardiovascular: document.getElementById('evaluacionCardiovascular').value,
        examenMuscularArticular: document.getElementById('examenMuscularArticular').value,
        pruebasFlexibilidadEquilibrio: document.getElementById('pruebasFlexibilidadEquilibrio').value,
        examenPostura: document.getElementById('examenPostura').value,
        evaluacionRespiratoria: document.getElementById('evaluacionRespiratoria').value,
        examenVisualAuditivo: document.getElementById('examenVisualAuditivo').value,
        examenSaludMental: document.getElementById('examenSaludMental').value,
        pruebaResistenciaFisica: document.getElementById('pruebaResistenciaFisica').value,
        analisisHabitosVida: document.getElementById('analisisHabitosVida').value,
        pruebasAdicionales: document.getElementById('pruebasAdicionales').value
        

       
    };
    db.collection("examenFisico").add(data)
        .then(() => {
            console.log("Examen médico agregado");
            document.querySelectorAll("input").forEach((input) => (input.value = ""));
        })
        .catch((error) => console.error("Error al agregar examen:", error));
}

// Leer documentos
const tabla2 = document.getElementById("tabla2");
db.collection("examenFisico").onSnapshot((querySnapshot) => {
    tabla2.innerHTML = "";
    querySnapshot.forEach((doc) => {
        const data = doc.data();
        tabla2.innerHTML += `
            <div class="bg-white p-4 shadow-md rounded-lg">
                <h3 class="font-bold text-lg">ID: ${doc.id}</h3>
                <p><strong>Nombre:</strong> ${data.nombre}</p>
                <p><strong>Apellido:</strong> ${data.apellido}</p>
                <p><strong>Edad:</strong> ${data.edad}</p>
                <p><strong>Peso:</strong> ${data.peso} kg</p>

                <p><strong>Valoración General de Salud:</strong> ${data.valoracionGeneralSalud}</p>
                <p><strong>Medición de Parámetros Básicos:</strong> ${data.medicionParametrosBasicos}</p>
                <p><strong>Evaluación Cardiovascular:</strong> ${data.evaluacionCardiovascular}</p>
                <p><strong>Examen Muscular y Articular:</strong> ${data.examenMuscularArticular}</p>
                <p><strong>Pruebas de Flexibilidad y Equilibrio:</strong> ${data.pruebasFlexibilidadEquilibrio}</p>
                <p><strong>Examen de Postura:</strong> ${data.examenPostura}</p>
                <p><strong>Evaluación Respiratoria:</strong> ${data.evaluacionRespiratoria}</p>
                <p><strong>Examen Visual y Auditivo:</strong> ${data.examenVisualAuditivo}</p>
                <p><strong>Examen de Salud Mental:</strong> ${data.examenSaludMental}</p>
                <p><strong>Prueba de Resistencia Física:</strong> ${data.pruebaResistenciaFisica}</p>
                <p><strong>Análisis de Hábitos de Vida:</strong> ${data.analisisHabitosVida}</p>
                <p><strong>Pruebas Adicionales según Necesidad:</strong> ${data.pruebasAdicionales}</p>

               
                <div class="mt-4">
                    <button class="bg-red-500 text-white px-3 py-1 rounded" onclick="eliminar('${doc.id}')">Eliminar</button>
                    <button class="bg-yellow-500 text-white px-3 py-1 rounded" onclick="editar('${doc.id}', '${data.nombre}', '${data.apellido}', '${data.edad}', '${data.peso}', '${data.memoria}', '${data.atencion}', '${data.inteligencia_emocional}', '${doc.id}', '${data.nombre}', '${data.apellido}', '${data.edad}', '${data.peso}', '${data.valoracionGeneralSalud}', 
                '${data.medicionParametrosBasicos}', 
                '${data.evaluacionCardiovascular}', 
                '${data.examenMuscularArticular}', 
                '${data.pruebasFlexibilidadEquilibrio}', 
                '${data.examenPostura}', 
                '${data.evaluacionRespiratoria}', 
                '${data.examenVisualAuditivo}', 
                '${data.examenSaludMental}', 
                '${data.pruebaResistenciaFisica}', 
                '${data.analisisHabitosVida}', 
                '${data.pruebasAdicionales}'
                  ')">Editar</button>
                </div>
            </div>`;
    });
});

// Eliminar documentos
function eliminar(id) {
    db.collection("examenFisico").doc(id).delete().then(() => {
        console.log("Documento eliminado");
    }).catch((error) => console.error("Error al eliminar:", error));
}

// Editar documentos
function editar(id, nombre, apellido, edad, peso, valoracionGeneralSalud,medicionParametrosBasicos , evaluacionCardiovascular, examenMuscularArticular,pruebasFlexibilidadEquilibrio,examenPostura,evaluacionRespiratoria,examenVisualAuditivo,examenSaludMental,pruebaResistenciaFisica,analisisHabitosVida,pruebasAdicionales) {
    // Asignamos los valores a los inputs correspondientes
    document.getElementById("nombre").value = nombre;
    document.getElementById("apellido").value = apellido;
    document.getElementById("edad").value = edad;
    document.getElementById("peso").value = peso;

    document.getElementById("valoracionGeneralSalud").value = valoracionGeneralSalud;
    document.getElementById("medicionParametrosBasicos").value = medicionParametrosBasicos;
    document.getElementById("evaluacionCardiovascular").value = evaluacionCardiovascular;
    document.getElementById("examenMuscularArticular").value = examenMuscularArticular;
    document.getElementById("pruebasFlexibilidadEquilibrio").value = pruebasFlexibilidadEquilibrio;
    document.getElementById("examenPostura").value = examenPostura;
    document.getElementById("evaluacionRespiratoria").value = evaluacionRespiratoria;
    document.getElementById("examenVisualAuditivo").value = examenVisualAuditivo;
    document.getElementById("examenSaludMental").value = examenSaludMental;
    document.getElementById("pruebaResistenciaFisica").value = pruebaResistenciaFisica;
    document.getElementById("analisisHabitosVida").value = analisisHabitosVida;
    document.getElementById("pruebasAdicionales").value = pruebasAdicionales;
    

    // Cambiar el texto y la acción del botón para actualizar
    const boton = document.getElementById("boton");
    boton.textContent = "Actualizar";
    
    boton.onclick = () => {
        // Tomamos los valores actuales de los inputs
        const nombreActualizado = document.getElementById("nombre").value;
        const apellidoActualizado = document.getElementById("apellido").value;
        const edadActualizada = document.getElementById("edad").value;
        const pesoActualizado = document.getElementById("peso").value;

        const valoracionGeneralSaludActualizada = document.getElementById("valoracionGeneralSalud").value;
        const medicionParametrosBasicosActualizada = document.getElementById("medicionParametrosBasicos").value;
        const evaluacionCardiovascularActualizada = document.getElementById("evaluacionCardiovascular").value;
        const examenMuscularArticularActualizado = document.getElementById("examenMuscularArticular").value;
        const pruebasFlexibilidadEquilibrioActualizadas = document.getElementById("pruebasFlexibilidadEquilibrio").value;
        const examenPosturaActualizado = document.getElementById("examenPostura").value;
        const evaluacionRespiratoriaActualizada = document.getElementById("evaluacionRespiratoria").value;
        const examenVisualAuditivoActualizado = document.getElementById("examenVisualAuditivo").value;
        const examenSaludMentalActualizado = document.getElementById("examenSaludMental").value;
        const pruebaResistenciaFisicaActualizada = document.getElementById("pruebaResistenciaFisica").value;
        const analisisHabitosVidaActualizado = document.getElementById("analisisHabitosVida").value;
        const pruebasAdicionalesActualizadas = document.getElementById("pruebasAdicionales").value;
       

        // Actualizamos el documento en Firestore con los nuevos valores
        db.collection("examenFisico").doc(id).update({
            nombre: nombreActualizado,
            apellido: apellidoActualizado,
            edad: edadActualizada,
            peso: pesoActualizado,
            valoracionGeneralSalud: valoracionGeneralSaludActualizada,
            medicionParametrosBasicos: medicionParametrosBasicosActualizada,
            evaluacionCardiovascular: evaluacionCardiovascularActualizada,
            examenMuscularArticular: examenMuscularArticularActualizado,
            pruebasFlexibilidadEquilibrio: pruebasFlexibilidadEquilibrioActualizadas,
            examenPostura: examenPosturaActualizado,
            evaluacionRespiratoria: evaluacionRespiratoriaActualizada,
            examenVisualAuditivo: examenVisualAuditivoActualizado,
            examenSaludMental: examenSaludMentalActualizado,
            pruebaResistenciaFisica: pruebaResistenciaFisicaActualizada,
            analisisHabitosVida: analisisHabitosVidaActualizado,
            pruebasAdicionales: pruebasAdicionalesActualizadas
           
            
        }).then(() => {
            console.log("Documento actualizado");
            boton.textContent = "Guardar";  // Cambiar el texto del botón a "Guardar"
            document.querySelectorAll("input").forEach((input) => input.value = "");  // Limpiar los inputs
        }).catch((error) => console.error("Error al actualizar:", error));
    };
}

 // Función para cerrar sesión
 document.getElementById("cerrarSesionBtn").addEventListener("click", function() {
    // Eliminar el usuario del localStorage
    localStorage.removeItem("usuario");

    // Redirigir al inicio (index.html)
    window.location.href = "/index.html";
});



 // Obtén el botón por su ID
 const redirigirBtn = document.getElementById('redirigirBtn');

 // Añade el evento de clic al botón
 redirigirBtn.addEventListener('click', function () {
     // Redirige a la página deseada cuando el botón es clickeado
     window.location.href ="/paginasweb/administradorexamen3.html"; 
 });
 // Obtén el botón por su ID
 const examen1 = document.getElementById('examen1');

 // Añade el evento de clic al botón
 examen1.addEventListener('click', function () {
     // Redirige a la página deseada cuando el botón es clickeado
     window.location.href ="/paginasweb/administradorexamen.html"; 
 });

  // Obtén el botón por su ID
  const dvdocente = document.getElementById('dvdocente');

  // Añade el evento de clic al botón
  dvdocente.addEventListener('click', function () {
      // Redirige a la página deseada cuando el botón es clickeado
      window.location.href ="/paginasweb/resultadoscv.html";
  });
 
 
 



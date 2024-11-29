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
        memoria: document.getElementById('memoria').value,
        atencion: document.getElementById('atencion').value,
        inteligencia_emocional: document.getElementById('inteligencia_emocional').value,

        rendimiento_cognitivo: document.getElementById('rendimiento_cognitivo').value,
        nivel_estres_ansiedad: document.getElementById('nivel_estres_ansiedad').value,
        percepcion_procesamiento_emocional: document.getElementById('percepcion_procesamiento_emocional').value,
        habilidades_resolucion_problemas: document.getElementById('habilidades_resolucion_problemas').value,
        autoconocimiento_motivacion: document.getElementById('autoconocimiento_motivacion').value,
        capacidades_toma_decisiones: document.getElementById('capacidades_toma_decisiones').value,
        adaptabilidad_al_cambio: document.getElementById('adaptabilidad_al_cambio').value,
    };
    db.collection("examenPsicologico").add(data)
        .then(() => {
            console.log("Examen médico agregado");
            document.querySelectorAll("input").forEach((input) => (input.value = ""));
        })
        .catch((error) => console.error("Error al agregar examen:", error));
}

// Leer documentos
const tabla = document.getElementById("tabla");
db.collection("examenPsicologico").onSnapshot((querySnapshot) => {
    tabla.innerHTML = "";
    querySnapshot.forEach((doc) => {
        const data = doc.data();
        tabla.innerHTML += `
            <div class="bg-white p-4 shadow-md rounded-lg">
                <h3 class="font-bold text-lg">ID: ${doc.id}</h3>
                <p><strong>Nombre:</strong> ${data.nombre}</p>
                <p><strong>Apellido:</strong> ${data.apellido}</p>
                <p><strong>Edad:</strong> ${data.edad}</p>
                <p><strong>Peso:</strong> ${data.peso} kg</p>
                <p><strong>Memoria:</strong> ${data.memoria}</p>
                <p><strong>Atención:</strong> ${data.atencion}</p>
                <p><strong>Inteligencia Emocional:</strong> ${data.inteligencia_emocional}</p>
                
                <p><strong>Rendimiento Cognitivo:</strong> ${data.rendimiento_cognitivo}</p>
                <p><strong>Nivel de Estrés y Ansiedad:</strong> ${data.nivel_estres_ansiedad}</p>
                <p><strong>Percepción y Procesamiento Emocional:</strong> ${data.percepcion_procesamiento_emocional}</p>
                <p><strong>Habilidades de Resolución de Problemas:</strong> ${data.habilidades_resolucion_problemas}</p>
                <p><strong>Autoconocimiento y Motivación:</strong> ${data.autoconocimiento_motivacion}</p>
                <p><strong>Capacidades de Toma de Decisiones:</strong> ${data.capacidades_toma_decisiones}</p>
                <p><strong>Adaptabilidad al Cambio:</strong> ${data.adaptabilidad_al_cambio}</p>
                <div class="mt-4">
                    <button class="bg-red-500 text-white px-3 py-1 rounded" onclick="eliminar('${doc.id}')">Eliminar</button>
                    <button class="bg-yellow-500 text-white px-3 py-1 rounded" onclick="editar('${doc.id}', '${data.nombre}', '${data.apellido}', '${data.edad}', '${data.peso}', '${data.memoria}', '${data.atencion}', '${data.inteligencia_emocional}', '${doc.id}', '${data.nombre}', '${data.apellido}', '${data.edad}', '${data.peso}', 
                    '${data.rendimiento_cognitivo}', '${data.nivel_estres_ansiedad}', 
                    '${data.percepcion_procesamiento_emocional}', '${data.habilidades_resolucion_problemas}', 
                    '${data.autoconocimiento_motivacion}', '${data.capacidades_toma_decisiones}', 
                    '${data.adaptabilidad_al_cambio}'
')">Editar</button>
                </div>
            </div>`;
    });
});

// Eliminar documentos
function eliminar(id) {
    db.collection("examenPsicologico").doc(id).delete().then(() => {
        console.log("Documento eliminado");
    }).catch((error) => console.error("Error al eliminar:", error));
}

// Editar documentos
function editar(id, nombre, apellido, edad, peso, memoria, atencion, inteligencia_emocional, rendimiento_cognitivo,nivel_estres_ansiedad,percepcion_procesamiento_emocional,habilidades_resolucion_problemas,autoconocimiento_motivacion,capacidades_toma_decisiones,adaptabilidad_al_cambio) {
    // Asignamos los valores a los inputs correspondientes
    document.getElementById("nombre").value = nombre;
    document.getElementById("apellido").value = apellido;
    document.getElementById("edad").value = edad;
    document.getElementById("peso").value = peso;
    document.getElementById("memoria").value = memoria;
    document.getElementById("atencion").value = atencion;
    document.getElementById("inteligencia_emocional").value = inteligencia_emocional;

    document.getElementById("rendimiento_cognitivo").value = rendimiento_cognitivo;
    document.getElementById("nivel_estres_ansiedad").value = nivel_estres_ansiedad;
    document.getElementById("percepcion_procesamiento_emocional").value = percepcion_procesamiento_emocional;
    document.getElementById("habilidades_resolucion_problemas").value = habilidades_resolucion_problemas;
    document.getElementById("autoconocimiento_motivacion").value = autoconocimiento_motivacion;
    document.getElementById("capacidades_toma_decisiones").value = capacidades_toma_decisiones;
    document.getElementById("adaptabilidad_al_cambio").value = adaptabilidad_al_cambio;


    // Cambiar el texto y la acción del botón para actualizar
    const boton = document.getElementById("boton");
    boton.textContent = "Actualizar";
    
    boton.onclick = () => {
        // Tomamos los valores actuales de los inputs
        const nombreActualizado = document.getElementById("nombre").value;
        const apellidoActualizado = document.getElementById("apellido").value;
        const edadActualizada = document.getElementById("edad").value;
        const pesoActualizado = document.getElementById("peso").value;
        const memoriaActualizada = document.getElementById("memoria").value;
        const atencionActualizada = document.getElementById("atencion").value;
        const inteligenciaEmocionalActualizada = document.getElementById("inteligencia_emocional").value;
       
        const rendimientoCognitivoActualizado = document.getElementById("rendimiento_cognitivo").value;
        const nivelEstresAnsiedadActualizado = document.getElementById("nivel_estres_ansiedad").value;
        const percepcionProcesamientoEmocionalActualizado = document.getElementById("percepcion_procesamiento_emocional").value;
        const habilidadesResolucionProblemasActualizado = document.getElementById("habilidades_resolucion_problemas").value;
        const autoconocimientoMotivacionActualizado = document.getElementById("autoconocimiento_motivacion").value;
        const capacidadesTomaDecisionesActualizado = document.getElementById("capacidades_toma_decisiones").value;
        const adaptabilidadAlCambioActualizado = document.getElementById("adaptabilidad_al_cambio").value;


        // Actualizamos el documento en Firestore con los nuevos valores
        db.collection("examenPsicologico").doc(id).update({
            nombre: nombreActualizado,
            apellido: apellidoActualizado,
            edad: edadActualizada,
            peso: pesoActualizado,
            memoria: memoriaActualizada,
            atencion: atencionActualizada,
            inteligencia_emocional: inteligenciaEmocionalActualizada,
            rendimientoCognitivo: rendimientoCognitivoActualizado,
            nivelEstresAnsiedad: nivelEstresAnsiedadActualizado,
            percepcionProcesamientoEmocional: percepcionProcesamientoEmocionalActualizado,
            habilidadesResolucionProblemas: habilidadesResolucionProblemasActualizado,
            autoconocimientoMotivacion: autoconocimientoMotivacionActualizado,
            capacidadesTomaDecisiones: capacidadesTomaDecisionesActualizado,
            adaptabilidadAlCambio: adaptabilidadAlCambioActualizado
            
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
     window.location.href ="/paginasweb/administradorxamen2.html"; // Aquí pones la URL de la página a la que deseas redirigir
 });



 // Obtén el botón por su ID
 const cursosdocente = document.getElementById('cursosdocente');

 // Añade el evento de clic al botón
 cursosdocente.addEventListener('click', function () {
     // Redirige a la página deseada cuando el botón es clickeado
     window.location.href ="/paginasweb/cursosdocente.html"; // Aquí pones la URL de la página a la que deseas redirigir
 });





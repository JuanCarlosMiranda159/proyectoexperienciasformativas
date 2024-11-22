// Ya puedes usar Firestore aquí (Firebase ya está configurado por la importación)
const db = firebase.firestore();

// Leer documentos para la tabla de resultados (Examen Físico)
const tabla2 = document.getElementById("tabla2");

db.collection("examenFisico").onSnapshot((querySnapshot) => {
    tabla2.innerHTML = ""; // Limpiar la tabla antes de agregar los resultados
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
                <p><strong>Pruebas Flexibilidad y Equilibrio:</strong> ${data.pruebasFlexibilidadEquilibrio}</p>
                <p><strong>Examen de Postura:</strong> ${data.examenPostura}</p>
                <p><strong>Evaluación Respiratoria:</strong> ${data.evaluacionRespiratoria}</p>
                <p><strong>Examen Visual y Auditivo:</strong> ${data.examenVisualAuditivo}</p>
                <p><strong>Examen de Salud Mental:</strong> ${data.examenSaludMental}</p>
                <p><strong>Prueba de Resistencia Física:</strong> ${data.pruebaResistenciaFisica}</p>
                <p><strong>Análisis de Hábitos de Vida:</strong> ${data.analisisHabitosVida}</p>
                <p><strong>Pruebas Adicionales según Necesidad:</strong> ${data.pruebasAdicionales}</p>
            </div>
        `;
    });
});

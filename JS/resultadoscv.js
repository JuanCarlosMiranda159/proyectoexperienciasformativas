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

// Leer documentos para la tabla de resultados (Perfil Docente)
const tabla3 = document.getElementById("tabla3");

db.collection("perfildocente1").onSnapshot((querySnapshot) => {
    tabla3.innerHTML = ""; // Limpiar la tabla antes de agregar los resultados
    querySnapshot.forEach((doc) => {
        const data = doc.data();
        tabla3.innerHTML += `
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
            </div>
        `;
    });
});
 // Obtén el botón por su ID
 const redirigirBt = document.getElementById('redirigirBt');

 // Añade el evento de clic al botón
 redirigirBt.addEventListener('click', function () {
     // Redirige a la página deseada cuando el botón es clickeado
     window.location.href ="/paginasweb/administradorxamen2.html"; // Aquí pones la URL de la página a la que deseas redirigir
 });

  // Obtén el botón por su ID
  const examen1 = document.getElementById('examen1');

  // Añade el evento de clic al botón
  examen1.addEventListener('click', function () {
      // Redirige a la página deseada cuando el botón es clickeado
      window.location.href ="/paginasweb/administradorexamen.html"; // Aquí pones la URL de la página a la que deseas redirigir
  });
 
 
 



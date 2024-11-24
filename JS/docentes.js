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

// Inicializar Firebase
firebase.initializeApp(firebaseConfig);

// Inicializar Firestore
const db = firebase.firestore();

// Función para guardar nuevos docentes
function guardar() {
    var nombre = document.getElementById('nombre').value;
    var apellido = document.getElementById('apellido').value;
    var materia = document.getElementById('materia').value;

    // Agregar el nuevo docente
    db.collection("docentes").add({
        first: nombre,
        last: apellido,
        subject: materia
    })
    .then(() => {
        console.log("Docente agregado con éxito!");

        // Limpiar los campos de texto
        document.getElementById('nombre').value = '';
        document.getElementById('apellido').value = '';
        document.getElementById('materia').value = '';
        
        // Actualizar la tabla de docentes
        mostrarTabla();
    })
    .catch((error) => {
        console.error("Error al agregar docente: ", error);
    });
}

// Función para mostrar la lista de docentes en la tabla
function mostrarTabla() {
    var tabla = document.getElementById('tabla');
    tabla.innerHTML = ''; // Limpiar la tabla antes de agregar los nuevos datos

    // Obtener todos los docentes
    db.collection("docentes").get().then((querySnapshot) => {
        var numDocentes = querySnapshot.size; // Número total de docentes

        // Generamos un array con los docentes para mantener el orden
        var docentes = [];
        querySnapshot.forEach((doc) => {
            docentes.push(doc);
        });

        // Ahora creamos la tabla con los docentes ordenados
        docentes.forEach((doc, index) => {
            console.log(`${doc.id} => ${doc.data().first}`);

            // Generamos el enlace dinámico con el ID del docente en la URL
            const enlace = `<button onclick="verPerfil('${doc.id}')" class="btn btn-info">Ver Perfil</button>`;

            // Agregar los datos a la tabla
            tabla.innerHTML += `
            <tr>
                <th scope="row">${doc.id}</th>
                <td>${doc.data().first}</td>
                <td>${doc.data().last}</td>
                <td>${doc.data().subject}</td>
                <td><button class="btn btn-danger" onclick="eliminar('${doc.id}')">Eliminar</button></td>
                <td><button class="btn btn-warning" onclick="editar('${doc.id}','${doc.data().first}','${doc.data().last}','${doc.data().subject}')">Editar</button></td>
                <td>${enlace}</td> <!-- Botón para ver el perfil -->
            </tr>`;
        });
    });
}

// Función para ver el perfil del docente
function verPerfil(id) {
    // Redirige a la página de perfil, pasando el ID como parámetro en la URL
    window.location.href = `/paginasweb/administradorexamen.html?id=${id}`;
}

// Función para eliminar un docente
function eliminar(id) {
    db.collection("docentes").doc(id).delete().then(() => {
        console.log("Docente eliminado con éxito!");
        mostrarTabla(); // Actualizar la tabla después de eliminar
    }).catch((error) => {
        console.error("Error al eliminar docente: ", error);
    });
}

// Función para editar los datos de un docente
function editar(id, nombre, apellido, materia) {
    document.getElementById('nombre').value = nombre;
    document.getElementById('apellido').value = apellido;
    document.getElementById('materia').value = materia;
    
    var boton = document.getElementById('boton');
    boton.innerHTML = 'Editar';

    boton.onclick = function() {
        var washingtonRef = db.collection("docentes").doc(id);

        var nombre = document.getElementById('nombre').value;
        var apellido = document.getElementById('apellido').value;
        var materia = document.getElementById('materia').value;

        // Actualizar el docente en Firestore
        return washingtonRef.update({
            first: nombre,
            last: apellido,
            subject: materia
        })
        .then(() => {
            console.log("Docente actualizado con éxito!");
            boton.innerHTML = 'Guardar';
            document.getElementById('nombre').value = '';
            document.getElementById('apellido').value = '';
            document.getElementById('materia').value = '';
            mostrarTabla(); // Actualizar la tabla después de editar
        })
        .catch((error) => {
            console.error("Error al actualizar docente: ", error);
        });
    };
}

// Llamar a la función para mostrar los docentes al cargar la página
mostrarTabla();

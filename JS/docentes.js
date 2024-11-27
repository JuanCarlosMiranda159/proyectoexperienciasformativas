// Importación de los módulos de Firebase
import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js';
import { getAuth, createUserWithEmailAndPassword, updateEmail, deleteUser } from 'https://www.gstatic.com/firebasejs/9.15.0/firebase-auth.js';
import { getFirestore, collection, addDoc, updateDoc, doc, onSnapshot, deleteDoc, getDoc } from 'https://www.gstatic.com/firebasejs/9.15.0/firebase-firestore.js';

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
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// Función para guardar datos del usuario
window.guardar = function() {
  var nombre = document.getElementById('nombre').value;
  var apellido = document.getElementById('apellido').value;
  var fecha = document.getElementById('fecha').value;
  var correo = document.getElementById('correo').value;
  var contraseña = document.getElementById('contraseña').value;

  // Validar campos
  if (!nombre || !apellido || !fecha || !correo || !contraseña) {
    alert("Por favor, complete todos los campos.");
    return;
  }

  // Validar correo electrónico
  function validarCorreo(correo) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(correo);
  }

  if (!validarCorreo(correo)) {
    alert("Por favor, ingrese un correo electrónico válido.");
    return;
  }

  // Validar contraseña
  if (contraseña.length < 6) {
    alert("La contraseña debe tener al menos 6 caracteres.");
    return;
  }

  // Crear usuario en Firebase Authentication
  createUserWithEmailAndPassword(auth, correo, contraseña)
    .then((userCredential) => {
      var user = userCredential.user;

      // Guardar datos del docente en Firestore, sin el campo 'password'
      addDoc(collection(db, "docentes"), {
        usuarioId: user.uid,  // Guardar el ID del usuario
        correo: correo,        // Guardar el correo
        first: nombre,         // Guardar el nombre
        last: apellido,        // Guardar el apellido
        born: fecha            // Guardar la fecha de nacimiento
      })
      .then(() => {
        console.log("Usuario agregado con éxito!");
        
        // Guardar nombre y apellido en localStorage
        localStorage.setItem("nombre", nombre);
        localStorage.setItem("apellido", apellido);

        // Limpiar los campos
        document.getElementById('nombre').value = '';
        document.getElementById('apellido').value = '';
        document.getElementById('fecha').value = '';
        document.getElementById('correo').value = '';
        document.getElementById('contraseña').value = '';
      })
      .catch((error) => {
        console.error("Error al agregar usuario en Firestore: ", error);
        alert("Error al guardar en Firestore: " + error.message);
      });
    })
    .catch((error) => {
      console.error("Error al crear el usuario: ", error.message);
      alert("Error al registrar usuario: " + error.message);
    });
}

// Mostrar usuarios en la tabla
const tabla = document.getElementById('tabla');
onSnapshot(collection(db, "docentes"), (querySnapshot) => {
  tabla.innerHTML = ``;
  querySnapshot.forEach((doc) => {
    tabla.innerHTML += `
      <tr>
        <th scope="row">${doc.id}</th>
        <td>${doc.data().first}</td>
        <td>${doc.data().last}</td>
        <td>${doc.data().born}</td>
        <td>${doc.data().correo}</td>
        <td><button class="btn btn-danger" onclick="eliminar('${doc.id}')">Eliminar</button></td>
        <td><button class="btn btn-warning" onclick="editar('${doc.id}','${doc.data().first}','${doc.data().last}','${doc.data().born}','${doc.data().correo}')">Editar</button></td>
      </tr>`;
  });
});

// Función para eliminar usuario
window.eliminar = function(id) {
  const docRef = doc(db, "docentes", id);
  deleteDoc(docRef)
    .then(() => {
      console.log("Usuario eliminado de Firestore.");
    })
    .catch((error) => {
      console.error("Error al eliminar el documento de Firestore:", error);
    });
}

// Función para editar datos del usuario
// Función para editar datos del usuario
window.editar = function(id, nombre, apellido, fecha, correo) {
  // Asignamos los valores a los campos de entrada
  document.getElementById('nombre').value = nombre;
  document.getElementById('apellido').value = apellido;
  document.getElementById('fecha').value = fecha;
  document.getElementById('correo').value = correo;

  // Cambiar el texto del botón a "Actualizar"
  var boton = document.getElementById('boton');
  boton.innerHTML = 'Actualizar';

  // Cambiar la función del botón a actualización
  boton.onclick = function() {
    // Obtener los nuevos valores de los campos de entrada
    var nuevoNombre = document.getElementById('nombre').value;
    var nuevoApellido = document.getElementById('apellido').value;
    var nuevaFecha = document.getElementById('fecha').value;
    var nuevoCorreo = document.getElementById('correo').value;

    var washingtonRef = doc(db, "docentes", id);

    // Actualizar los datos en Firestore
    updateDoc(washingtonRef, {
      first: nuevoNombre,
      last: nuevoApellido,
      born: nuevaFecha,
      correo: nuevoCorreo
    })
    .then(() => {
      console.log("Datos actualizados en Firestore");

      // Si el correo ha cambiado, actualizamos también en Firebase Authentication
      const user = auth.currentUser;
      if (user && user.email !== nuevoCorreo) {
        // Si el correo ha cambiado, actualizamos el correo en Firebase Authentication
        updateEmail(user, nuevoCorreo)
          .then(() => {
            console.log("Correo electrónico actualizado en Firebase Authentication.");
          })
          .catch((error) => {
            console.error("Error al actualizar el correo en Firebase Authentication: ", error);
          });
      }

      // Restaurar el botón a "Guardar" después de la actualización
      boton.innerHTML = 'Guardar';
      boton.onclick = guardar;  // Restablecer la acción original de guardar

      // Limpiar los campos (opcional)
      document.getElementById('nombre').value = '';
      document.getElementById('apellido').value = '';
      document.getElementById('fecha').value = '';
      document.getElementById('correo').value = '';
    })
    .catch((error) => {
      console.error("Error al actualizar los datos en Firestore: ", error);
    });
  };
};

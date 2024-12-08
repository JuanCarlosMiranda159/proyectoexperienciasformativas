import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.0.2/firebase-app.js';
import { getFirestore, collection, getDocs } from 'https://www.gstatic.com/firebasejs/9.0.2/firebase-firestore.js';

const firebaseConfig = {
    apiKey: "AIzaSyApIC92oXvNBvXEwZhhA_otz9ZSUOg2D7E",
    authDomain: "gestiondocente-dece4.firebaseapp.com",
    projectId: "gestiondocente-dece4",
    storageBucket: "gestiondocente-dece4.appspot.com",
    messagingSenderId: "891960766782",
    appId: "1:891960766782:web:35c6c9397772447d2afc6f",
    measurementId: "G-WETFYZ3PST"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const tablaDatosPrevios = document.getElementById("tablaDatosPrevios");

async function loadData() {
    const querySnapshot = await getDocs(collection(db, "datosPrevios"));
    tablaDatosPrevios.innerHTML = "";

    querySnapshot.forEach((doc) => {
        const data = doc.data();
        tablaDatosPrevios.innerHTML += `
            <tr>
                <td class="py-2 px-4 border">${doc.id}</td>
                <td class="py-2 px-4 border">${data.nombre}</td>
                <td class="py-2 px-4 border">${data.formacionAcademica}</td>
                <td class="py-2 px-4 border">${data.experienciaPrevia}</td>
                <td class="py-2 px-4 border">${data.proyectos}</td>
                <td class="py-2 px-4 border">${data.metodoPagoSueldo}</td> <!-- Aquí agregas el dato del método de pago -->
            </tr>
        `;
    });
}

loadData();

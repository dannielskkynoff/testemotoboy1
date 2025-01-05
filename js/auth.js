import { initializeApp, getApps } from "firebase/app";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { firebaseConfig } from "./firebase-config.js";

if (getApps().length === 0) {
    initializeApp(firebaseConfig);
}

const auth = getAuth();
const loginForm = document.getElementById('login-form');
const errorMessage = document.getElementById('error-message');

loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            // Redirecionar com base no tipo de usuário (você precisa armazenar isso no banco de dados)
            // Exemplo (precisa ser implementado):
            // if (user.tipo === 'logista') {
            //     window.location.href = 'logista/dashboard.html';
            // } else if (user.tipo === 'entregador') {
            //     window.location.href = 'entregador/entregador.html';
            // }
            window.location.href = 'logista/dashboard.html'; // Redirecionamento temporário
        })
        .catch((error) => {
            console.error("Erro no login:", error);
            errorMessage.textContent = "Email ou senha incorretos.";
        });
});

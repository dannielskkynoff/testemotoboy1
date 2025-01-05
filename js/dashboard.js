import { initializeApp, getApps } from "firebase/app";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { firebaseConfig } from "../js/firebase-config.js";
import { createEntrega, getEntregadoresDisponiveis, updateEntregaStatus, getEntrega } from "../js/database.js";
import { requestForToken, sendNotification } from "../js/messaging.js";

if (getApps().length === 0) {
    initializeApp(firebaseConfig);
}

const auth = getAuth();
const messaging = getMessaging();

const formEntrega = document.getElementById('form-entrega');
const slidePanel = document.getElementById('slide-panel');
const closePanel = document.querySelector('.close-panel');
const btnChamarEntregador = document.getElementById('btn-chamar-entregador');
const btnSair = document.getElementById('btn-sair');
const pendentesTbody = document.getElementById('pendentes-tbody');
const aceitosTbody = document.getElementById('aceitos-tbody');
const entreguesTbody = document.getElementById('entregues-tbody');

const serverKey = 'SUA_CHAVE_DE_SERVIDOR'; // Substitua pela sua chave de servidor FCM
const VAPID_KEY = "SUA_CHAVE_VAPID";

onAuthStateChanged(auth, (user) => {
    if (!user) {
        window.location.href = '../index.html'; // Redireciona para o login se não estiver autenticado
    }
});

btnSair.addEventListener('click', () => {
    signOut(auth).then(() => {
        window.location.href = '../index.html';
    }).catch((error) => {
        console.error("Erro ao sair:", error);
    });
});

btnChamarEntregador.addEventListener('click', () => {
    slidePanel.style.display = 'block';
});

closePanel.addEventListener('click', () => {
    slidePanel.style.display = 'none';
});

formEntrega.addEventListener('submit', async (e) => {
    e.preventDefault();
    const user = auth.currentUser;
    if (!user) return; // Segurança extra

    const dadosEntrega = {
        nome: document.getElementById('nome').value,
        contato: document.getElementById('contato').value,
        bairro: document.getElementById('bairro').value,
        rua: document.getElementById('rua').value,
        numero: document.getElementById('numero').value,
        localizacao: document.getElementById('localizacao').value,
        observacao: document.getElementById('observacao').value,
    };

    try {
        const newEntregaRef = await createEntrega(user.uid, dadosEntrega);
        const newEntregaKey = newEntregaRef.key;
        slidePanel.style.display = 'none';
        formEntrega.reset();
        const entregadores = await getEntregadoresDisponiveis();
        const tokens = entregadores.map(entregador => entregador.tokenNotificacao).filter(token => token !== null);

        if (tokens.length > 0) {
            await sendNotification(tokens, `Nova entrega em: ${dadosEntrega.rua}, ${dadosEntrega.bairro}`, newEntregaKey, serverKey);
            alert("Solicitação de entrega enviada!");
        } else {
            alert('Nenhum entregador disponível no momento.');
        }
        atualizarListaEntregas();
    } catch (error) {
        console.error("Erro ao criar entrega:", error);
        alert("Erro ao criar entrega. Verifique o console

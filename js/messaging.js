import { getMessaging, getToken } from "firebase/messaging";

export const requestForToken = async (messaging, VAPID_KEY) => {
    try {
        const currentToken = await getToken(messaging, { vapidKey: VAPID_KEY });
        if (currentToken) {
            console.log("Token FCM:", currentToken);
            return currentToken
        } else {
            console.log('Nenhum token de registro disponível. Solicite permissão ao usuário para gerar um.');
            return null;
        }
    } catch (err) {
        console.log('Ocorreu um erro ao solicitar o token.', err);
        return null;
    }
}
export const sendNotification = async (tokens, mensagem, entregaId, serverKey) => {
    try {
        const response = await fetch('https://fcm.googleapis.com/fcm/send', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `key=${serverKey}`
            },
            body: JSON.stringify({
                registration_ids: tokens,
                notification: {
                    title: 'Nova Entrega!',
                    body: mensagem
                },
                data: {
                    entregaId: entregaId
                }
            })
        });
        const data = await response.json();
        console.log('Resposta do FCM:', data);
        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`Erro ao enviar notificação: ${response.status} - ${errorText}`);
        }
        return data;
    }

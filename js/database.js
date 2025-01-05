import { getDatabase, ref, push, set, onValue, update } from "firebase/database";

const db = getDatabase();

export const createEntrega = (userId, dadosEntrega) => {
    const entregasRef = ref(db, 'entregas');
    return push(entregasRef, { ...dadosEntrega, criador: userId, status: 'pendente' });
};

// Outras funções para ler, atualizar e deletar dados, se necessário.
export const getEntregadoresDisponiveis = () => {
    const entregadoresRef = ref(db, 'entregadores');
    return new Promise((resolve, reject) => {
        onValue(entregadoresRef, (snapshot) => {
            const entregadores = [];
            snapshot.forEach((childSnapshot) => {
                const entregador = childSnapshot.val();
                if (entregador.status === 'disponivel') {
                    entregadores.push(entregador);
                }
            });
            resolve(entregadores);
        }, (error) => {
            reject(error);
        });
    });
}
export const updateEntregaStatus = (entregaId, novoStatus, entregadorId) => {
    const entregaRef = ref(db, `entregas/${entregaId}`);
    return update(entregaRef, { status: novoStatus, entregadorId: entregadorId });
};
export const getEntrega = (entregaId) => {
    const entregaRef = ref(db, `entregas/${entregaId}`);
    return new Promise((resolve, reject) => {
        onValue(entregaRef, (snapshot) => {
            resolve(snapshot.val());
        }, (error) => {
            reject(error);
        });
    });
}

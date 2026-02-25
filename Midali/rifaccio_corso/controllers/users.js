import { v4 as uuidv4 } from 'uuid';

let users = [];

export const getAllUsers = (req, res) => {
    console.log(users);
    res.json(users);
};

export const getUserByID = (req, res) => {
    const { id } = req.params;

    const userTrovato = users.find(u => u.id === id);

    res.send(userTrovato);
};

export const insertUser = (req, res) => {
    console.log(req.body);
    const user = req.body;
    // uso uuid per generare un id univoco per ogni utente
    const id = uuidv4();

    // creo un nuovo oggetto utente con l'id generato e i dati ricevuti nel corpo della richiesta
    const userWhitID = { ...user, id: id };

    users.push(userWhitID);
    res.send(`utente inserito: ${userWhitID.name} con id: ${id}`);
};
export const deleteUser = (req, res) => {
    const { id } = req.params;

    users = users.filter(u => u.id !== id);

    res.send(`utente con id ${id} eliminato`);
};

export const updateUser = (req, res) => {
    const { id } = req.params;
    const { name, email } = req.body;


    const userTrovato = users.find(u => u.id === id);

    if (name) {
        userTrovato.name = name;
    }
    if (email) {
        userTrovato.email = email;
    }
    console.log(`utente con id ${id} aggiornato:`, userTrovato);

    res.send(userTrovato);
};


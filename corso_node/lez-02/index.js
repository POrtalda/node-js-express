const express = require('express');
const app = express();
const PORT = 3000;

let tasks = [
    {
        id: 't001',
        title: 'Comprare il latte',
        completed: false
    },
    {
        id: 't002',
        title: 'Fare la spesa',
        completed: false
    },
    {
        id: 't003',
        title: 'Studiare Node.js',
        completed: false
    }
];


// gestione API
// GET /tasks
app.get('/tasks', (req, res) => {
    res.status(200).json(tasks);
});

// GET /tasks/:id (/tasks/t001)
app.get('/tasks/:id', (req, res) => {
    // 1. leggere dall'url cosa viene scritto dopo /tasks/
    // destrutturiamo quello che c'è dopo '/tasks/' che sarà l'id
    const { id } = req.params;

    // 2. ora vado a vedere se nell'array c'è un oggetto con quell'id
    const task = tasks.find(t => t.id === id);

    // 3. se lo trovo lo mando al client
if (task) {
res.status(200).json(task)
}
    //4. se non lo trovo mando un messaggio esplicativo
    else {
        const message = {success: false, message: `il task con id ${id} non è stato trovato`}
res.status(404).json(message)
    }
})

app.listen(PORT, () => {
    console.log(`il server è stato avviato sulla porta ${PORT}`)
});
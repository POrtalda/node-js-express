const express = require('express');
const crypto = require('crypto');
const app = express();
const PORT = 3000;

let employees = [
    {id: crypto.randomUUID(), username: "MarioRossi", password: "M1234r5678", email: "mario.rossi@gmail.com", img: "link", role: "user", present: true},
    {id: crypto.randomUUID(), username: "LuigiBianchi", password: "L1234b5678", email: "luigi.bianchi@gmail.com", img: "link", role: "user", present: true} ,
    {id: crypto.randomUUID(), username: "Admin", password: "A1234d5678", email: "admin@gmail.com", img: "link", role: "admin", present: true}
];

// Middleware to parse JSON bodies
app.use(express.json());


// API routes
// GET /employees
app.get('/employees', (req, res) => {
    res.status(200).json({
        success: true,
        data: employees,
        message: 'Chiamata GET per tutti i dipendenti riuscita'
    });
});

// Get /employees/:id
app.get('/employees/:id', (req, res) => {
const {id} = req.params;
const employee = employees.find(e => e.id ===id);
if(employee) {
res.status(200).json({
    success: true,
    data: employee,
    message: 'Chiamata GET per 1 dipendente con id riuscita'
});
}else {
    res.status(404).json({
        success: false,
        data: null,
        message: 'dipendente non trovato con questo id'
    });
};
});


// Post /employees
app.post('/employees', (req, res) => {
    const newEmployee = req.body;
    newEmployee.id = crypto.randomUUID();
    employees.push(newEmployee);
    res.status(201).json({
        success: true,
        data: employees,
        message: 'Nuovo dipendente creato con successo'
    });
});

// put /employees/:id
app.put('/employees/:id', (req, res) => {
    const {id} = req.params;
    const employee = employees.find(e => e.id === id); // dipendente da aggiornare
    if (employee) {
        const employeeToUpdate = {...employee, ...req.body}; // dipendente aggiornato
        employees = employees.map(e => e.id === id ? employeeToUpdate : e); // aggiorno l'array dei dipendenti
            res.status(200).json({
                success: true,
                data: employees,
                message: 'Dipendente aggiornato con successo'
            });
    } else {
        res.status(404).json({
            success: false,
            data: null,
            message: 'Dipendente non trovato con questo id'
        });
    }
});


// DELETE /employees/:id
app.delete('/employees/:id', (req, res) => {
    const {id} = req.params;
    const employee = employees.find(e => e.id === id);

    if(employee) {
        employees = employees.filter(e => e.id !== id); // aggiorno l'array degli employees

        return res.status(200).json({
            success: true,
            data: employees,
            message: 'Dipendente cancellato correttamente'
        });
        
    }
    
    else{
        return res.status(404).json({
            success: false,
            message: 'Dipendente non eliminabile in quanto non trovato nessun dipendente con questo id',
            data: null
        });
    }
    
    });

    

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
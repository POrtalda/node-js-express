const express = require('express');
const usersRouterRouter = express.Router();

let users = [
    {id: "U001", name: "Alice", email: "alice@example.com"},
    {id: "U002", name: "Bob", email: "bob@example.com"},
    {id: "U003", name: "Charlie", email: "charlie@example.com"}
];


// API



module.exports = usersRouterRouter;
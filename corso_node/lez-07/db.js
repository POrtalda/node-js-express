const {MongoClient} = require("mongodb")

const uri = "mongodb://localhost:27017"  // stringa di connessiione al server Mongodb

const client = new MongoClient(uri);

let db;

async function connectDB() {
    try {
        await client.connect();
        db = client.db("biblioteca_db");   // ATTENZIONE NOME DEL DATABASE
        console.log("connesso al database MongoDB");
    } catch (error) {
        console.error("Errore di connessione al database:", error);
    }
}

function getDB() {
    if (!db) {
        throw new Error("errore di accesso al database");
    }
    return db;
}

module.exports = { connectDB, getDB };
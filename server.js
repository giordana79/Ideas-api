const express = require("express"); // Importa Express per creare il server
const mongoose = require("mongoose"); // Importa Mongoose per gestire MongoDB
const cors = require("cors"); // Importa CORS per permettere richieste da frontend
const path = require("path"); // Modulo Node.js per gestire percorsi file
require("dotenv").config(); // Carica variabili d'ambiente dal file .env

const Idea = require("./models/idea"); // Importa il modello Mongoose "Idea"

const app = express(); // Crea un'app Express

// MIDDLEWARE

// Abilita CORS (Cross-Origin Resource Sharing)
app.use(cors());

// Permette al server di leggere il corpo delle richieste in JSON
app.use(express.json());

// Serve file statici dalla cartella "public" (index.html, style.css, script.js)
app.use(express.static(path.join(__dirname, "public")));

//  ROTTE

// Rotta principale per frontend: restituisce index.html
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

//  CRUD /api/ideas

// GET tutte le idee (ordinamento decrescente per data creazione)
app.get("/api/ideas", async (req, res) => {
  try {
    const ideas = await Idea.find().sort({ createdAt: -1 }); // Recupera idee da DB
    res.json(ideas); // Invia JSON al client
  } catch (err) {
    res.status(500).json({ error: err.message }); // Errore server
  }
});

// GET singola idea tramite ID
app.get("/api/ideas/:id", async (req, res) => {
  try {
    const idea = await Idea.findById(req.params.id); // Cerca idea per ID
    if (!idea) return res.status(404).json({ error: "Idea non trovata" }); // Non trovata
    res.json(idea); // Invia idea come JSON
  } catch (err) {
    res.status(500).json({ error: err.message }); // Errore server
  }
});

// POST nuova idea
app.post("/api/ideas", async (req, res) => {
  try {
    const newIdea = new Idea(req.body); // Crea nuova idea dal corpo della richiesta
    const saved = await newIdea.save(); // Salva nel DB
    res.status(201).json(saved); // Restituisce idea creata con codice 201
  } catch (err) {
    res.status(400).json({ error: err.message }); // Errore validazione/DB
  }
});

// PATCH aggiorna titolo, descrizione o likes
app.patch("/api/ideas/:id", async (req, res) => {
  try {
    const updated = await Idea.findByIdAndUpdate(
      req.params.id, // ID da aggiornare
      req.body, // Dati da aggiornare
      { new: true } // Restituisce il documento aggiornato
    );
    if (!updated) return res.status(404).json({ error: "Idea non trovata" });
    res.json(updated); // Invia idea aggiornata
  } catch (err) {
    res.status(400).json({ error: err.message }); // Errore aggiornamento
  }
});

// DELETE elimina un’idea
app.delete("/api/ideas/:id", async (req, res) => {
  try {
    const deleted = await Idea.findByIdAndDelete(req.params.id); // Elimina idea per ID
    if (!deleted) return res.status(404).json({ error: "Idea non trovata" });
    res.json({ message: "Idea eliminata con successo" }); // Messaggio successo
  } catch (err) {
    res.status(500).json({ error: err.message }); // Errore server
  }
});

//  AVVIO SERVER
const PORT = process.env.PORT || 3000; // Porta server da .env oppure 3000

mongoose
  .connect(process.env.MONGO_URI) // Connessione a MongoDB
  .then(() => {
    console.log("✅ MongoDB connesso"); // Messaggio se connesso
    app.listen(
      PORT,
      () => console.log(`🌐 Server avviato su http://localhost:${PORT}`) // Avvio server
    );
  })
  .catch((err) => console.error("❌ Errore connessione MongoDB:", err)); // Errore connessione

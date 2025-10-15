// Router Express che implementa le 5 principali operazioni CRUD

const express = require("express");
const mongoose = require("mongoose");
const Idea = require("../models/idea");
const router = express.Router();

// POST /api/ideas
// Crea una nuova idea
router.post("/", async (req, res) => {
  try {
    const { author, title, description, category, likes, status } = req.body;

    const idea = new Idea({
      author,
      title,
      description,
      category,
      likes,
      status,
    });
    const saved = await idea.save();

    res.status(201).json(saved);
  } catch (err) {
    // gestione degli errori di validazione di Mongoose
    if (err.name === "ValidationError") {
      const messages = Object.values(err.errors).map((e) => e.message);
      return res
        .status(400)
        .json({ error: "Validation error", details: messages });
    }
    console.error(err);
    res.status(500).json({ error: "Errore interno del server" });
  }
});

// GET /api/ideas/:id
// Mostra una singola idea
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.isValidObjectId(id))
      return res.status(400).json({ error: "ID non valido" });

    const idea = await Idea.findById(id);
    if (!idea) return res.status(404).json({ error: "Idea non trovata" });

    res.json(idea);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Errore interno del server" });
  }
});

// PATCH /api/ideas/:id
// Aggiorna titolo o descrizione e altri campi se presenti
router.patch("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.isValidObjectId(id))
      return res.status(400).json({ error: "ID non valido" });

    // Limita gli aggiornamenti ai campi permessi cosi si evita l'overrride di createdAt)
    const allowed = [
      "title",
      "description",
      "category",
      "likes",
      "status",
      "author",
    ];
    const updates = {};
    for (const key of allowed) {
      if (req.body[key] !== undefined) updates[key] = req.body[key];
    }

    const updated = await Idea.findByIdAndUpdate(id, updates, {
      new: true,
      runValidators: true,
    });
    if (!updated) return res.status(404).json({ error: "Idea non trovata" });

    res.json(updated);
  } catch (err) {
    if (err.name === "ValidationError") {
      const messages = Object.values(err.errors).map((e) => e.message);
      return res
        .status(400)
        .json({ error: "Validation error", details: messages });
    }
    console.error(err);
    res.status(500).json({ error: "Errore interno del server" });
  }
});

// DELETE /api/ideas/:id
// Cancella un'idea
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.isValidObjectId(id))
      return res.status(400).json({ error: "ID non valido" });

    const removed = await Idea.findByIdAndDelete(id);
    if (!removed) return res.status(404).json({ error: "Idea non trovata" });

    res.json({ message: "Idea cancellata", id: removed._id });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Errore interno del server" });
  }
});

module.exports = router;

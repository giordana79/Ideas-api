// Modello Mongoose per l'entità "Idea".

const mongoose = require("mongoose");

const ideaSchema = new mongoose.Schema({
  author: {
    type: String,
    required: [true, "L'autore è obbligatorio"],
    trim: true,
  },
  title: {
    type: String,
    required: [true, "Il titolo è obbligatorio"],
    trim: true,
    maxlength: [120, "Il titolo non può superare 120 caratteri"],
  },
  description: {
    type: String,
    required: [true, "La descrizione è obbligatoria"],
    trim: true,
    maxlength: [2000, "Descrizione troppo lunga"],
  },
  category: {
    type: String,
    default: "generale",
    trim: true,
  },
  likes: {
    type: Number,
    default: 0,
  },
  status: {
    type: String,
    enum: ["in corso", "approvata", "scartata"],
    default: "in corso",
  },
  createdAt: {
    type: Date,
    default: () => new Date(),
  },
});

module.exports = mongoose.model("Idea", ideaSchema);

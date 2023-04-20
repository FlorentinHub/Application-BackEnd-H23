const mongoose = require('mongoose');

const professorSchema = new mongoose.Schema({
  nom: { type: String, required: true },
  courriel: { type: String, required: true },
  cours: [{type: String, required: false}]
});

module.exports = mongoose.model('Professor', professorSchema);

const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
  nom: { type: String, required: true },
  professor: { type: mongoose.Schema.Types.ObjectId, ref: 'Professor', required: true },
  student: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Student', required:false }]
});

module.exports = mongoose.model('Course', courseSchema);

const HttpError = require("../models/http-erreur");
const HttpErreur = require("../models/http-erreur");
const Course = require('../models/course');
const Professor = require('../models/professor');

//TESTS: WORKING
exports.create = async (requete, reponse, next) => {
  const { nom, dateDebut, dateFin, professor } = requete.body;

  const nouveauCours = new Course({
    nom,
    professor,
    student: [],
  });
  let prof
  try {
    prof = await Professor.findById(professor);
  } catch (err){
    console.log(err.message)
    return next(
      new HttpErreur("Erreur lors de la création du cours", 500));
  }
  if (!prof) {
    return next(
      new HttpErreur("Impossible de trouver le professeur dans sa liste", 404));
  }
  try {
    await nouveauCours.save();
    prof.cours.push(nouveauCours);
    await prof.save();
  } catch {
    return next(new HttpErreur("Erreur lors de la création du cours", 500));
  }
  reponse.status(201).json({ cours: nouveauCours.toObject({ getters: true }) });
};
//TESTS: WORKING
exports.getById = async (req, res) => {
  const { id } = req.params;
  try {
    const course = await Course.findById(id)
      .populate('professor', 'nom')
      .populate('student', 'nom');
    if (!course) throw new Error('Course not found');
    course.save();
    res.status(200).json(course);
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
};
//TESTS: WORKING
exports.update = async (req, res) => {
  const { id } = req.params;
  const { nom, professor } = req.body;
  try {
    const course = await Course.findByIdAndUpdate(id, { nom, professor }, { new: true })
      .populate('professor', 'nom')
      .populate('student', 'nom');
    if (!course) throw new Error('Course not found');
    course.save();
    res.status(200).json(course);
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
  
};
//TEST: WORKING
exports.delete = async (req, res) => {
  const { id } = req.params;
  try {
    const course = await Course.findByIdAndDelete(id);
    if (!course) throw new Error('Course not found');
    res.status(204).send();
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
};

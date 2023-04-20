const { response } = require("express");
const { default: mongoose, mongo } = require("mongoose");
const { v4: uuidv4 } = require("uuid");


const HttpError = require("../models/http-erreur");
const HttpErreur = require("../models/http-erreur");
let ObjectId = require("mongoose").Types.ObjectId;
const Prof = require("../models/professor");
const Cours = require('../models/course'); // importez le modèle "Cours"

const getById = async (requete, reponse, next) => {
  const profId = requete.params.id;
  console.log(profId)
  let prof;
  try {
    prof = await Prof.findById(profId);
  } catch (err) {
    console.log(err.message)
    return next(
      new HttpErreur("Erreur lors de la récupération du professeur", 500)
    );
  }
  if (!prof) {
    return next(new HttpErreur("Aucune professeur trouvée pour l'id fourni", 404));
  }
  reponse.json({ prof: prof.toObject({ getters: true }) });
};

const create = async (requete, reponse, next) => {
  console.log(requete.body);
  const { nom, courriel } = requete.body;
  const newProf = new Prof({
    nom,
    courriel,
    cours: [],
  });

  try {
    await newProf.save();
  } catch (err) {
    console.log(err.message)
    const erreur = new HttpErreur("Création du professeur échouée", 500);
    return next(erreur);
  }
  reponse.status(201).json({ prof: newProf });
};

const update = async (requete, reponse, next) => {
  const { nom, courriel } = requete.body;
  const id = requete.params.id;

  let prof;

  try {
    prof = await Prof.findById(id);
    prof.nom = nom;
    prof.courriel = courriel;
    await prof.save();
  } catch (err){
    console.log(err.message)
    return next(
      new HttpErreur("Erreur lors de la mise à jour du professeur", 500)
    );
  }

  reponse.status(201).json({ prof: prof.toObject({ getters: true }) });
};

const deleteProf = async (requete, reponse, next) => {
  const profId = requete.params.id;
  let profExist = await VerifProfesseur(profId);
  if (profExist==false) {
    return next(new HttpError("Le professeur en question n'éxiste pas", 404));
  } else {
    try {
      await Cours.updateMany({ profIds: profId },{ $pull: { profIds: profId } }); //Supression du professeur de ses cours
      try {
        await Prof.deleteOne({ _id: profId });//Supression du professeur de la liste
        reponse.status(201).json({ message: "Le professeur a bien été supprimé" });
      } catch (err) {
        console.log(err);//DO DELETE
        return next(
          new HttpError("Erreur lors de la suppression de Le professeur", 500)
        );
      }
    } catch (err) {
      console.log(err); //DO DELETE
      return next(
        new HttpError("Erreur lors de la suppression de Le professeur", 500)
      );
    }
  }
}

async function VerifProfesseur(profId) {
  let rep = false;
  if (ObjectId.isValid(profId)) {
    rep = await Prof.exists({ _id: profId });
  }
  return rep;
}

const ajouterCours = async (requete, reponse, next) => {
  const { cours } = requete.body;
  const professorId = requete.params.id;
  let professeur, course;
  professeur = await Prof.findById(professorId);
  
  if (!professeur) {
    return next(new HttpErreur("Impossible de trouver Le professeur", 404));
  }

  course = await Cours.findById(cours);

  if (!course) {
    return next(new HttpErreur("Impossible de trouver le cours", 404));
  }

  try {
    professeur.cours.push(cours);
    course.professeur.push(professeur);

    await professeur.save();
    await course.save();
  } catch {
    new HttpErreur("Erreur lors de l'ajout de cours", 500);
  }

  reponse.status(200).json({ professeur: professeur.toObject({ getters: true }) });
};

exports.getById = getById;
exports.create = create;
exports.update = update;
exports.ajouterCours= ajouterCours;
exports.deleteProf = deleteProf; //Changement de methode apres plusieurs essais avec methode apprise dans le cours.

const { response } = require("express");
const { default: mongoose, mongo } = require("mongoose");
const { v4: uuidv4 } = require("uuid");


const HttpError = require("../models/http-erreur");
const HttpErreur = require("../models/http-erreur");
let ObjectId = require("mongoose").Types.ObjectId;
const Student = require("../models/student");// importez le modèle "Student"
const Cours = require('../models/course'); // importez le modèle "Cours"
const student = require("../models/student");

const getById = async (requete, reponse, next) => {
  const studentId = requete.params.id;
  let student;
  try {
    student = await Student.findById(studentId);
  } catch (err) {
    console.log(err.message)
    return next(
      new HttpErreur("Erreur lors de la récupération de l'etudiant", 500)
    );
  }
  if (!student) {
    return next(new HttpErreur("Aucune etudiant trouvée pour l'id fourni", 404));
  }
  reponse.json({ student: student.toObject({ getters: true }) });
};

const create = async (requete, reponse, next) => {
  console.log(requete.body);
  const { nom, courriel } = requete.body;
  const newStudent = new Student({
    nom,
    courriel,
    cours: [],
  });

  try {
    await newStudent.save();
  } catch (err) {
    console.log(err.message)
    const erreur = new HttpErreur("Création de l'etudiant échouée", 500);
    return next(erreur);
  }
  reponse.status(201).json({ student: newStudent });
};

const update = async (requete, reponse, next) => {
  const { nom, courriel } = requete.body;
  const id = requete.params.id;

  let student;

  try {
    student = await Student.findById(id);
    student.nom = nom;
    student.courriel = courriel;
    await student.save();
  } catch (err){
    console.log(err.message)
    return next(
      new HttpErreur("Erreur lors de la mise à jour de l'etudiant", 500)
    );
  }

  reponse.status(201).json({ student: student.toObject({ getters: true }) });
};

const deleteStudent = async (requete, reponse, next) => {
  const studentId = requete.params.id;
  let studentExist = await VerifEtudiant(studentId);
  if (studentExist==false) {
    return next(new HttpError("L'étudiant en question n'éxiste pas", 404));
  } else {
    try {
      await Cours.updateMany({ studentIds: studentId },{ $pull: { studentIds: studentId } }); //Supression de l'etudiant de ses cours
      try {
        await Student.deleteOne({ _id: studentId });//Supression de l'etudiant de la liste
        reponse.status(201).json({ message: "L'étudiant a bien été supprimé" });
      } catch (err) {
        console.log(err);//DO DELETE
        return next(
          new HttpError("Erreur lors de la suppression de l'étudiant", 500)
        );
      }
    } catch (err) {
      console.log(err); //DO DELETE
      return next(
        new HttpError("Erreur lors de la suppression de l'étudiant", 500)
      );
    }
  }
}

async function VerifEtudiant(studentId) {
  let rep = false;
  if (ObjectId.isValid(studentId)) {
    rep = await Student.exists({ _id: studentId });
  }
  return rep;
}

const ajouterCours = async (requete, reponse, next) => {
  try {
    let cours = requete.body.id;
    console.log("requete.body", requete.body);
    console.log("requete.body.id:", requete.body.id);
    console.log(cours);
    if (!cours) {
      return next(new HttpErreur("Le paramètre 'id' du cours est manquant", 400));
    }
    let studentID = requete.params.id;
    let student = await Student.findById(studentID);
    if (!student) {
      return next(new HttpErreur("Impossible de trouver l'étudiant", 404));
    }
    let course = await Cours.findById(cours);
    if (!course) {
      return next(new HttpErreur("Impossible de trouver le cours", 404));
    }
    //Ajours de l'etudiant dans le cours
    console.log("student: ",student)
    console.log("student.cours: ", student.cours)
    console.log("course: ", course)
    console.log("course.student: ",course.student)
    student.cours.push(cours);
    //Ajours du cours dans la liste de cours de l'etudiant
    course.student.push(student);

    //Sauvegarde
    await student.save();
    await course.save();
    reponse.status(200).json({ student: student.toObject({ getters: true }) });
  } catch (err) {
    console.log(err.message);
    return next(new HttpErreur("Erreur lors de l'ajout de cours", 500));
  }
};


exports.getById = getById;
exports.create = create;
exports.update = update;
exports.ajouterCours= ajouterCours;
exports.deleteStudent = deleteStudent; //Changement de methode apres plusieurs essais avec methode apprise dans le cours.

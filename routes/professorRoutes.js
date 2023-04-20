const express = require('express');
const router = express.Router();
const professorController = require('../controllers/professorController');

router.post('/', professorController.create); // Yup
router.get('/:id', professorController.getById); // Yup
router.put('/:id', professorController.update); // Yup
router.delete('/:id', professorController.deleteProf); // Yup
router.patch('/:id/ajouterCours',professorController.ajouterCours) //Yup

module.exports = router;
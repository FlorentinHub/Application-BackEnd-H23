const express = require('express');
const router = express.Router();
const professorController = require('../controllers/professorController');

router.post('/', professorController.create);
router.get('/:id', professorController.getById);
router.put('/:id', professorController.update);
router.delete('/:id', professorController.deleteProf);
router.patch('/:id/ajouterCours',professorController.ajouterCours)
// router.patch("/cours/:professeurId", professorController.ajouterCours);

module.exports = router;
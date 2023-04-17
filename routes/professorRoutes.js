const express = require('express');
const router = express.Router();
const courseController = require('../controllers/courseController');

router.post('/', courseController.create);
router.get('/:id', courseController.getById);
router.put('/:id', courseController.update);
router.delete('/:id', courseController.delete);

module.exports = router;
//const router = express.Router();
const professorController = require('../controllers/professorController');

router.post('/', professorController.create);
router.get('/:id', professorController.getById);
router.put('/:id', professorController.update);
router.delete('/:id', professorController.delete);
router.post('/:id/courses', professorController.addCourse);

module.exports = router;

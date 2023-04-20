const express = require('express');
const router = express.Router();
const studentController = require('../controllers/studentController');

router.post('/', studentController.create); // Yup
router.get('/:id', studentController.getById); // Yup
router.patch('/:id', studentController.update); // Yup
router.patch("/:id/ajouterCours", studentController.ajouterCours); // Yup
router.delete('/:id', studentController.deleteStudent); // Yup
// router.post('/:id/courses', studentController.addCourse);

module.exports = router;

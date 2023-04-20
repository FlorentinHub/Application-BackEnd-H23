const express = require('express');
const router = express.Router();
const studentController = require('../controllers/studentController');

router.post('/', studentController.create);
router.get('/:id', studentController.getById);
router.patch('/:id', studentController.update);
router.patch("/:id/ajouterCours", studentController.ajouterCours);
router.delete('/:id', studentController.deleteStudent);
// router.post('/:id/courses', studentController.addCourse);

module.exports = router;

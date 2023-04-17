const express = require('express');
const router = express.Router();
const courseController = require('../controllers/courseController');

router.post('/', courseController.create);
router.get('/:id', courseController.getById);
router.put('/:id', courseController.update);
router.delete('/:id', courseController.delete);

module.exports = router;
//const router = express.Router();
const studentController = require('../controllers/studentController');

router.post('/', studentController.create);
router.get('/:id', studentController.getById);
router.put('/:id', studentController.update);
router.delete('/:id', studentController.delete);
router.post('/:id/courses', studentController.addCourse);

module.exports = router;
router.post('/:id/courses', studentController.addCourse);

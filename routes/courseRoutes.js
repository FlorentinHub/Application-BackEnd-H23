const express = require('express');
const router = express.Router();
const courseController = require('../controllers/courseController');

router.post('/', courseController.create); // Yup
router.get('/:id', courseController.getById); //
router.patch('/:id', courseController.update); //
router.delete('/:id', courseController.delete); //

module.exports = router;

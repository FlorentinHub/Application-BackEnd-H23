const express = require('express');
const router = express.Router();
const courseController = require('../controllers/courseController');

router.post('/', courseController.create); // Yup
router.get('/:id', courseController.getById); // Yup
router.patch('/:id', courseController.update); // Yup
router.delete('/:id', courseController.delete); // Yup

module.exports = router;

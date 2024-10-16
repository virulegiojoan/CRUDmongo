const express = require('express');
const router = express.Router();
const bookController = require('../controllers/book.controller');

// Rutas
router.get('/', bookController.getAllBooks);
router.post('/', bookController.createBook);
router.get('/:id', bookController.getBook, bookController.getBookById);
router.patch('/:id', bookController.getBook, bookController.updateBook);
router.delete('/:id', bookController.getBook, bookController.deleteBook);

module.exports = router;

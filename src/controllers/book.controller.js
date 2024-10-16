const Book = require('../models/book.model');

// Middleware para validar ID y obtener el libro
const getBook = async (req, res, next) => {
  let book;
  const { id } = req.params;

  if (!id.match(/^[0-9a-fA-F]{24}$/)) {
    return res.status(404).json({ message: 'El ID del libro no es válido' });
  }

  try {
    book = await Book.findById(id);
    if (!book) {
      return res.status(404).json({ message: 'El libro no fue encontrado' });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }

  res.book = book;
  next();
};

// Obtener todos los libros
const getAllBooks = async (req, res) => {
  try {
    const books = await Book.find();
    res.json(books);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Crear un nuevo libro
const createBook = async (req, res) => {
  const { title, author, genre, publicationDate } = req.body;

  if (!title || !author || !genre || !publicationDate) {
    return res.status(400).json({ message: 'Los campos título, autor, género y fecha son obligatorios' });
  }

  const book = new Book({ title, author, genre, publicationDate });

  try {
    const newBook = await book.save();
    res.status(201).json(newBook);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Obtener un libro por ID
const getBookById = (req, res) => {
  res.json(res.book);
};

// Actualizar parcialmente un libro
const updateBook = async (req, res) => {
  const { title, author, genre, publicationDate } = req.body;

  if (!title && !author && !genre && !publicationDate) {
    return res.status(400).json({ message: 'Debes enviar al menos un campo para actualizar: Título, Autor, Género o Fecha de Publicación' });
  }

  try {
    const book = res.book;
    book.title = title || book.title;
    book.author = author || book.author;
    book.genre = genre || book.genre;
    book.publicationDate = publicationDate || book.publicationDate;

    const updatedBook = await book.save();
    res.json(updatedBook);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Eliminar un libro por ID
const deleteBook = async (req, res) => {
  try {
    const book = res.book;
    await book.deleteOne();
    res.json({ message: `El libro "${book.title}" fue eliminado correctamente` });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Exportar las funciones
module.exports = {
  getBook,
  getAllBooks,
  createBook,
  getBookById,
  updateBook,
  deleteBook
};

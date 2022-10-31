const { Op } = require('sequelize');
const Book = require('../models/Book');

const addBook = async function(bookObj) {
  const ins = await Book.create(bookObj)
  return JSON.stringify(ins)
}

const deleteBook = async function(id) {
  const result = await Book.destroy({
    where: {
      id
    }
  })
  return result
}

const updateBook = async function(id, bookObj) {
  const result = await Book.update(bookObj, {
    where: {
      id
    }
  })
  return result
}

const getBook = async function(id) {
  const result = await Book.findByPk(id)
  if(result) {
    return result.toJSON();
  }
  return result
}

const getBooks = async function({ name, imgUrl, publishDate, author, page, size }) {
  const whereFilter = {}
  if(name) {
    whereFilter.name = {
      [Op.like]: `%${name}%`
    }
  }
  if(author) {
    whereFilter.author = {
      [Op.like]: `%${author}%`
    }
  }
  const { count, rows } = await Book.findAndCountAll({
    where: {
      ...whereFilter
    },
    offset: (page - 1) * size,
    limit: +size
  })

  return {
    total: count,
    list: JSON.parse(JSON.stringify(rows))
  }
}

module.exports = {
  deleteBook,
  addBook,
  updateBook,
  getBooks,
  getBook
}
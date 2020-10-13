'use strict'


const STORAGE_KEY = 'booksDB';
// const PAGE_SIZE = 5;
// var gPageIdx = 0;
var gBooks
var gNextId = 1

_createBooks()




function getBooks() {
    return gBooks
}

function _createBook(name, price, desc = makeLorem()) {
    return {
        id: gNextId++,
        name: name,
        price: price,
        desc: desc,
        imgUrl: `img/${gNextId - 1}.jpg`,
        rating: 0
    }
}

function _createBooks() {
    var books = loadFromStorage(STORAGE_KEY)
    if (!books || !books.length) {
        books = []

        books.push(_createBook('Harry Potter', 29.90))
        books.push(_createBook('Ender\'s Game', 42.40))
        books.push(_createBook('Wizard\'s First Rule', 50.50))

    }
    gBooks = books;
    _saveBooksToStorage();
}

function _saveBooksToStorage() {
    saveToStorage(STORAGE_KEY, gBooks)
}

function removeBook(bookId) {
    var bookIdx = _getBookIdxById(bookId)
    gBooks.splice(bookIdx, 1)
    _saveBooksToStorage()
}

function addBook(name, price) {
    var book = _createBook(name, price)
    gBooks.unshift(book)
    _saveBooksToStorage()

}

function UpdateBook(bookId, price) {
    var bookIdx = _getBookIdxById(bookId)
    gBooks[bookIdx].price = price
    _saveBooksToStorage()
}

function _getBookIdxById(bookId) {
    return gBooks.findIndex(function (book) {
        return bookId === book.id
    })
}

function getBookById(bookId) {
    return gBooks.find(function (book) {
        return bookId === book.id
    })
}

function addRating(bookId) {
    var bookIdx = _getBookIdxById(bookId)
    gBooks[bookIdx].rating++
    _saveBooksToStorage()
}

function reduceRating(bookId) {
    var bookIdx = _getBookIdxById(bookId)
    gBooks[bookIdx].rating--
    _saveBooksToStorage()
}
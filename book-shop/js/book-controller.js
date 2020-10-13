'use strict'

var gModalBookId

function onInit() {
    renderBooks()
}

function renderBooks() {
    var books = getBooks()
    var strHtmls = books.map(function (book) {
        return `
        <tr class="book-preview">
    <td>
        <h5 class="card-title">${book.name}</h5>
    </td>
    <td>
        <p class="card-text">Price: ${book.price}</p>
    </td>
    <td>
        <a href="#" onclick="onRemoveBook(${book.id})">Delete</a>
    </td>
    <td>
        <a href="#" onclick="onReadBook(${book.id})">Details</a>
    </td>
    <td>
        <a href="#" onclick="onUpdateBook(${book.id})">Update</a>
    </td>
    </div>
</tr>
        `
    })
    document.querySelector('.book-shelf tbody').innerHTML = strHtmls.join('')
}

function onRemoveBook(bookId) {
    removeBook(bookId)
    renderBooks()
}

function onAddBook() {
    var elName = document.getElementById('add-book-name')
    var elPrice = document.getElementById('add-book-price')
    var name = elName.value
    var price = elPrice.value
    addBook(name, price)
    renderBooks()
}

function onUpdateBook(bookId) {
    var newPrice = +prompt('Enter the book\'s new price')
    UpdateBook(bookId, newPrice)
    renderBooks()
}

function onReadBook(bookId) {
    gModalBookId = bookId
    var book = getBookById(bookId)
    var elModal = document.querySelector('.modal')
    elModal.querySelector('img').src = book.imgUrl
    elModal.querySelector('h5').innerText = book.name
    elModal.querySelector('h6').innerText = 'Price: ' + book.price
    elModal.querySelector('h7 span').innerText = 'Rating: ' + book.rating
    elModal.querySelector('p').innerText = book.desc
    elModal.hidden = false
}

function onCloseModal() {
    document.querySelector('.modal').hidden = true
}

function onRatingDown() {
    reduceRating(gModalBookId)
    var book = getBookById(gModalBookId)
    document.querySelector('.modal h7 span').innerText = 'Rating: ' + book.rating
}

function onRatingUp() {
    addRating(gModalBookId)
    var book = getBookById(gModalBookId)
    document.querySelector('.modal h7 span').innerText = 'Rating: ' + book.rating
}

/* <img class="book-img" src="${book.imgUrl}"></img> */
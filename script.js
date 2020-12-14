let myLibrary = [];

// book constructor
function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

// returns a string of the books properties
Book.prototype.info = function() {
  return `${this.title}, by ${this.author}, ${this.pages} pages, ${this.read ? 'finished' : 'not yet read'}.`
}

// creates a book obj from arguments given and appends it to the library
function addBookToLibrary(title, author, pages, read) {
  const newBook = new Book(title, author, pages, read ? 'Read' : 'Not Read');
  myLibrary.push(newBook);
}

// creates a HTML element from a book obj
function bookElement(book) {
  let bookElement = document.createElement('div');
  bookElement.classList.add('book');

  let list = document.createElement('ul');
  bookElement.appendChild(list);

  for (key in book) {
    if (book.hasOwnProperty(key)) {
      let info = document.createElement('li');
      info.innerHTML = book[key];
      list.appendChild(info);
    }
  }
  return bookElement; 
}

addBookToLibrary('Microserfs', 'Douglas Couplnad', 371, true);
addBookToLibrary('Jicroserfs', 'Fouglas Fouplnad', 371, true);
addBookToLibrary('Picroserfs', 'Bouglas Mouplnad', 371, true);
addBookToLibrary('Gicroserfs', 'Oouglas Souplnad', 371, true);
addBookToLibrary('Sicroserfs', 'Pouglas Douplnad', 371, true);

const bookContainer = document.querySelector('.books-container');
const bookForm = document.querySelector('.book-form');

myLibrary.forEach(book => {
  bookContainer.appendChild(bookElement(book));
});

// makes new book from form values and appends it to the book container
function saveBook() {
  let book = new Array(
    document.querySelector('.book-form #title').value,
    document.querySelector('.book-form #author').value,
    document.querySelector('.book-form #pages').value,
    document.querySelector('.book-form #read').checked 
  );
  addBookToLibrary(...book);
  bookForm.reset();
  bookContainer.appendChild(bookElement(myLibrary[myLibrary.length -1]));
}
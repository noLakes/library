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
  const newBook = new Book(title, author, pages, read);
  myLibrary.push(newBook);
}

// creates a HTML element from a book obj
function bookElement(book) {
  let bookElement = document.createElement('div');
  bookElement.classList.add('book_container');

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

const bookContainer = document.querySelector('div.books');

myLibrary.forEach(book => {
  bookContainer.appendChild(bookElement(book));
});




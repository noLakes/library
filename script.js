let myLibrary = [];

const bookContainer = document.querySelector('.books-container');
const bookForm = document.querySelector('.book-form');

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

// deletes book from doc and library
function deleteBook(e) {
  let bookDiv = e.target.parentElement.parentElement
  myLibrary.splice(bookDiv.dataset.indexNumber, 1);
  bookDiv.remove();
}

// toggles read status in doc and library
function toggleRead(e) {
}

// creates a delete button
function delButton() {
  let delButton = document.createElement('button');
  delButton.classList.add('delete-book');
  delButton.addEventListener('click', deleteBook);
  delButton.innerHTML = ('delete');
  return delButton;
}

// creates a read toggle button
function readButton() {
  let readButton = document.createElement('button');
  readButton.classList.add('toggle-read');
  readButton.addEventListener('click', toggleRead);
  readButton.innerHTML = ('toggle read');
  return readButton;
}

// creates a div containing the two above buttons
function buttonsDiv() {
  let buttonDiv = document.createElement('div');
  buttonDiv.classList.add('button-container');
  buttonDiv.appendChild(readButton());
  buttonDiv.appendChild(delButton());
  return buttonDiv;
}

// creates a HTML element for a book obj
function bookDiv(book, index) {
  let bookDiv = document.createElement('div');
  bookDiv.classList.add('book');
  bookDiv.setAttribute('data-index-number', index);

  let list = document.createElement('ul');
  bookDiv.appendChild(list);

  bookDiv.appendChild(buttonsDiv());

  for (key in book) {
    if (book.hasOwnProperty(key)) {
      let info = document.createElement('li');
      info.classList.add(`${key}`);
      if (key === 'pages') {
        info.innerHTML = `${book[key]} pages`;
      } else {
        info.innerHTML = book[key];
      }
      list.appendChild(info);
    }
  }
  return bookDiv; 
}

addBookToLibrary('Microserfs', 'Douglas Coupland', 371, true);
addBookToLibrary('Jicroserfs', 'Fouglas Foupland', 371, true);
addBookToLibrary('Picroserfs', 'Bouglas Moupland', 371, true);
addBookToLibrary('Gicroserfs', 'Oouglas Soupland', 371, true);
addBookToLibrary('Sicroserfs', 'Pouglas Doupland', 371, true);

myLibrary.forEach((book, index) => {
  bookContainer.appendChild(bookDiv(book, index));
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
  bookContainer.appendChild(bookDiv(myLibrary[myLibrary.length -1], myLibrary.length -1));
}


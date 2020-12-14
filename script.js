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

function deleteBook(e) {
  console.log(e.target);
}

function toggleRead(e) {
  console.log(e);
}

// creates a HTML element for a book obj
function bookElement(book, index) {
  let bookElement = document.createElement('div');
  bookElement.classList.add('book');
  bookElement.setAttribute('data-index-number', index);

  let list = document.createElement('ul');
  bookElement.appendChild(list);

  let delButton = document.createElement('button');
  delButton.classList.add('delete-book');
  delButton.addEventListener('click', deleteBook);
  delButton.innerHTML = ('delete');

  let readButton = document.createElement('button');
  readButton.classList.add('toggle-read');
  readButton.addEventListener('click', toggleRead);
  readButton.innerHTML = ('toggle read');

  let buttonContainer = document.createElement('div');
  buttonContainer.classList.add('button-container');
  buttonContainer.appendChild(readButton);
  buttonContainer.appendChild(delButton);
  bookElement.appendChild(buttonContainer);

  for (key in book) {
    if (book.hasOwnProperty(key)) {
      let info = document.createElement('li');
      if (key === 'pages') {
        info.innerHTML = `${book[key]} pages`;
      } else {
        info.innerHTML = book[key];
      }
      list.appendChild(info);
    }
  }
  return bookElement; 
}

addBookToLibrary('Microserfs', 'Douglas Coupland', 371, true);
addBookToLibrary('Jicroserfs', 'Fouglas Foupland', 371, true);
addBookToLibrary('Picroserfs', 'Bouglas Moupland', 371, true);
addBookToLibrary('Gicroserfs', 'Oouglas Soupland', 371, true);
addBookToLibrary('Sicroserfs', 'Pouglas Doupland', 371, true);

myLibrary.forEach((book, index) => {
  bookContainer.appendChild(bookElement(book, index));
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
  bookContainer.appendChild(bookElement(myLibrary[myLibrary.length -1], myLibrary.length -1));
}


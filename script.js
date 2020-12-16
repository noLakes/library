let myLibrary = [];

if (localStorage['myLibrary']) {
  myLibrary = JSON.parse(localStorage['myLibrary']);
}

// book constructor
function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

const bookContainer = document.querySelector('.books-container');
const bookForm = document.querySelector('.book-form');

// creates a book obj from arguments given and appends it to the library
function addBookToLibrary(title, author, pages, read) {
  const newBook = new Book(title, author, pages, read);
  myLibrary.push(newBook);
  saveLibrary();
}

// saves library to local storage (as 'myLibrary')
function saveLibrary() {
  localStorage.setItem('myLibrary', JSON.stringify(myLibrary));
  console.log('library saved!');
  console.table(JSON.parse(localStorage['myLibrary']));
}

// deletes book from doc and library
function deleteBook(e) {
  const bookDiv = e.target.parentElement.parentElement
  myLibrary.splice(bookDiv.dataset.indexNumber, 1);
  bookDiv.remove();
  saveAndReload();
}

// toggles read status in doc and library
function toggleRead(e) {
  const bookDiv = e.target.parentElement.parentElement
  if (myLibrary[bookDiv.dataset.indexNumber].read) {
    myLibrary[bookDiv.dataset.indexNumber].read = false;
  } else {
    myLibrary[bookDiv.dataset.indexNumber].read = true;
  }
  saveAndReload();
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
      } else if (key === 'read') {
        info.innerHTML = book[key] ? 'Read' : 'Not read';
      } else {
        info.innerHTML = book[key];
      }
      list.appendChild(info);
    }
  }
  return bookDiv; 
}

// makes new book from form values and appends it to the book container
function submitBook() {
  addBookToLibrary(
    document.querySelector('.book-form #title').value,
    document.querySelector('.book-form #author').value,
    document.querySelector('.book-form #pages').value,
    document.querySelector('.book-form #read').checked
  );
  bookForm.reset();
  saveAndReload();
}

// populate the library (if empty) in testing
if (myLibrary.length === 0) {
  addBookToLibrary('Microserfs', 'Douglas Coupland', 371, true);
  addBookToLibrary('Jicroserfs', 'Fouglas Foupland', 371, true);
  addBookToLibrary('Picroserfs', 'Bouglas Moupland', 371, true);
  addBookToLibrary('Gicroserfs', 'Oouglas Soupland', 371, true);
  addBookToLibrary('Sicroserfs', 'Pouglas Doupland', 371, true);
}

// creates and appends a book element for each book in myLibrary
function updateDisplay() {
  bookContainer.innerHTML = ''
  myLibrary.forEach((book, index) => {
    bookContainer.appendChild(bookDiv(book, index));
  });
}

// DRY function - bad idea?
function saveAndReload() {
  saveLibrary();
  updateDisplay();
}

// loads book elements on page load
updateDisplay();
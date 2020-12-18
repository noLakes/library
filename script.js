let myLibrary = [];

if (localStorage['myLibrary']) {
  myLibrary = JSON.parse(localStorage['myLibrary']);
}

const bookContainer = document.querySelector('.books-container');
const bookForm = document.querySelector('.book-form');
const modal = document.querySelector('.modal');
const openModal = document.querySelector('open-modal');
const closeModal = document.querySelector('close-modal');

//close modal if user clicks away from it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
} 

const inputs = {
  'title' : document.querySelector('.book-form #title'),
  'author' : document.querySelector('.book-form #author'),
  'pages' : document.querySelector('.book-form #pages'),
  'read' : document.querySelector('.book-form #read'),
  'not_read' : document.querySelector('.book-form #not_read')
}

// book constructor
function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

// creates a book obj from arguments given and appends it to the library
function addBookToLibrary(title, author, pages, read) {
  const newBook = new Book(title, author, pages, read);
  myLibrary.push(newBook);
  saveLibrary();
}

// saves library to local storage (as 'myLibrary')
function saveLibrary() {
  localStorage.setItem('myLibrary', JSON.stringify(myLibrary));
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

// returns true if form inputs are valid, false if not
function checkInputs() {
  vals = new Array(inputs['title'].value, inputs['author'].value, inputs['pages'].value);
  if (vals[2] != '' && isNaN(vals[2])) {return false};
  return !vals.includes('');
}

// makes new book from form values and appends it to the book container
function submitBook() {
  if (!checkInputs()) {
    alert('please enter valid book details');
    return;
  }
  addBookToLibrary(
    inputs['title'].value,
    inputs['author'].value,
    inputs['pages'].value,
    inputs['read'].checked
  );
  bookForm.reset();
  saveAndReload();
}

function newBookTile() {
  let bookDiv = document.createElement('div');
  bookDiv.classList.add('book');
  bookDiv.classList.add('new-book');

  const button = document.createElement('button');
  button.classList.add('open-modal');
  button.innerHTML = '+';
  button.onclick = function() {
    modal.style.display = "block";
  }
  bookDiv.appendChild(button);

  return bookDiv;
}

// creates and appends a book element for each book in myLibrary
function updateDisplay() {
  bookContainer.innerHTML = ''
  myLibrary.forEach((book, index) => {
    bookContainer.appendChild(bookDiv(book, index));
  });
  bookContainer.appendChild(newBookTile());
}

// DRY function - bad idea?
function saveAndReload() {
  saveLibrary();
  updateDisplay();
}

// loads book elements on page load
updateDisplay();
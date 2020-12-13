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


function bookElement(book) {
  const book = document.createElement('div');
  book.classList.add('book_container');

  const list = document.createElement('ul');
  book.appendChild(list);
  
  //loop over book values and append them to list as list items?

}

let book = new Book('Microserfs', 'Douglas Couplnad', 371, true);
console.log(book.info());
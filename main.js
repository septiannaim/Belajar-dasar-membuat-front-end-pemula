// Fetch stored books from localStorage, or initialize empty array if no books exist
const books = JSON.parse(localStorage.getItem('books')) || [];

// Function to render the books into the respective racks
function renderBooks() {
  const incompleteBookList = document.getElementById('incompleteBookList');
  const completeBookList = document.getElementById('completeBookList');

  incompleteBookList.innerHTML = '';
  completeBookList.innerHTML = '';

  books.forEach(book => {
    const bookElement = document.createElement('div');
    bookElement.setAttribute('data-bookid', book.id);
    bookElement.setAttribute('data-testid', 'bookItem');

    bookElement.innerHTML = `
      <h3 data-testid="bookItemTitle">${book.title}</h3>
      <p data-testid="bookItemAuthor">Penulis: ${book.author}</p>
      <p data-testid="bookItemYear">Tahun: ${book.year}</p>
      <div>
        <button data-testid="bookItemIsCompleteButton" onclick="toggleCompletion(${book.id})">
          ${book.isComplete ? 'Belum selesai dibaca' : 'Selesai dibaca'}
        </button>
        <button data-testid="bookItemDeleteButton" onclick="deleteBook(${book.id})">
          Hapus Buku
        </button>
        <button data-testid="bookItemEditButton" onclick="editBook(${book.id})">
          Edit Buku
        </button>
      </div>
    `;

    if (book.isComplete) {
      completeBookList.appendChild(bookElement);
    } else {
      incompleteBookList.appendChild(bookElement);
    }
  });
}

// Function to handle the form submission for adding a book
document.getElementById('bookForm').addEventListener('submit', function (e) {
  e.preventDefault();

  const title = document.getElementById('bookFormTitle').value;
  const author = document.getElementById('bookFormAuthor').value;
  const year = Number(document.getElementById('bookFormYear').value);
  const isComplete = document.getElementById('bookFormIsComplete').checked;

  const newBook = {
    id: new Date().getTime(),
    title,
    author,
    year,
    isComplete,
  };

  books.push(newBook);
  localStorage.setItem('books', JSON.stringify(books));
  renderBooks();
});

// Function to toggle the completion status of a book
function toggleCompletion(id) {
  const book = books.find(book => book.id === id);
  book.isComplete = !book.isComplete;
  localStorage.setItem('books', JSON.stringify(books));
  renderBooks();
}

// Function to delete a book
function deleteBook(id) {
  const bookIndex = books.findIndex(book => book.id === id);
  if (bookIndex !== -1) {
    books.splice(bookIndex, 1);
    localStorage.setItem('books', JSON.stringify(books));
    renderBooks();
  }
}

// Function to edit a book
function editBook(id) {
  const book = books.find(book => book.id === id);
  // For now, we just log the book for simplicity
  console.log('Edit Book:', book);
  // You could open an edit form here to modify the book's data
}

// Initial render
renderBooks();

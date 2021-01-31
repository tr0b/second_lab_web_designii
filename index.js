/* Books Object Array  */
let books = [
  {
    id: 1,
    name: "My First Book",
    author: "Thomas",
    genre: "comedy",
    no_copyright: true,
    publisher: "Stalag",
  },
  {
    id: 2,
    name: "Alice in Wonderland",
    author: "Lewis Carroll",
    genre: "fantasy",
    no_copyright: false,
    publisher: "Stalag",
  },
  {
    id: 3,
    name: "The Stranger",
    author: "Albert Camus",
    genre: "thriller",
    no_copyright: false,
    publisher: "Stalag",
  },
];
/* Generates Delete Button  */
let delete_button = document.createElement("button");
delete_button.setAttribute("id", "delete");
delete_button.setAttribute("onClick", "deleteBook(this)");

/* Generates Save Button  */
let save_button = document.createElement("button");
save_button.setAttribute("id", "save");
save_button.setAttribute("onClick", "saveBook()");
save_button.appendChild(document.createTextNode("GUARDAR (SAVE)"));

/* Inserts Save Button in DOM  */
document.getElementById("books_form").appendChild(save_button);

/* CRUD Methods */
/* Fetches Hard-coded books  */
const fetchBooks = (books_list) => {
  // Save Changes in book array
  books = books_list;
  // Pseudo-Refresh table
  if (document.getElementById("books") !== null) {
    document
      .getElementsByTagName("body")[0]
      .removeChild(document.getElementById("books"));
  }
  let books_table = document.createElement("table");
  books_table.setAttribute("id", "books");
  document.getElementsByTagName("body")[0].appendChild(books_table);
  // Get books table dom element
  generateBooksTableRows(books_list, books_table);
  generateBooksTableColumns(books_list, books_table);
};

// Loop all keys, insert them as columns. Lets assume all objects have the same keys, therefore we grab
// All keys from the first object in the array
const generateBooksTableColumns = (books_list, books_table_element) => {
  let table_head = books_table_element.createTHead();
  let books_table_element_head_row = table_head.insertRow();
  Object.keys(books_list[0]).map((book_key) => {
    let book_column = document.createElement("th");
    let book_column_content = document.createTextNode(book_key);
    book_column.appendChild(book_column_content);
    books_table_element_head_row.appendChild(book_column);
  });
};

// Generate Rows based on each book properties
const generateBooksTableRows = (books_list, books_table_element) => {
  table_body = books_table_element.createTBody();
  books_list.map((book) => {
    let book_table_body_row = books_table_element.insertRow();
    Object.keys(book).map((key) => {
      let cell = book_table_body_row.insertCell();
      let cell_content = document.createTextNode(book[key]);
      cell.appendChild(cell_content);
    });
    // Insert Delete Button in Table

    let cloned_delete_button = delete_button.cloneNode();
    cloned_delete_button.appendChild(
      document.createTextNode("DELETE (BORRAR)")
    );
    book_table_body_row.appendChild(cloned_delete_button);
  });
};

// Delete Book
const deleteBook = (element) => {
  let selected_book_id = parseInt(
    element.parentElement.children[0].innerText,
    10
  );
  let filtered_books_list = books.filter(
    (book) => book.id !== selected_book_id
  );
  fetchBooks(filtered_books_list);
};

// Updates Book
const updateBook = (book_id, new_book_content) => {
  // Returns if books array is empty
  if (!books.length) {
    return;
  }
  new_book_content.id = book_id;
  let selected_book_index = books.findIndex((book) => book.id === book_id);
  // Returns if books does not contain book with such book id. Else, update book based on selected book index
  if (selected_book_index === -1) {
    return books;
  }
  // Copy of books, with updated element
  let updated_books = [
    ...books.slice(0, selected_book_index),
    { ...books[selected_book_index], ...new_book_content },
    ...books.slice(selected_book_index + 1),
  ];
  return updated_books;
};

// Creates Book
const createBook = (new_book_content) => {
  new_book_content.id = !books.length ? 0 : books.slice(-1)[0].id + 1;
	// Copies books array, inserts new book and returns new array to retain inmutability
  updated_books = [...books, new_book_content];
  return updated_books;
};

// Save Book Action (updates or creates depending on update checkbox)

const saveBook = () => {
  let update_book = document.getElementById("update_book").checked;
  let new_book = {
    id: undefined,
    name: document.getElementById("name").value,
    author: document.getElementById("author").value,
    genre: document.getElementById("genre").value,
    no_copyright: document.getElementById("no_copyright").checked,
    publisher: document.getElementById("publisher").value,
  };
  let book_id = parseInt(document.getElementById("book_id").value);
  new_books = update_book ? updateBook(book_id, new_book) : createBook(new_book);
  fetchBooks(new_books);
};

// Init
const init = () => {
  fetchBooks(books);
};

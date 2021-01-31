/* CRUD Methods */
/* Fetches Hard-coded books  */
const fetchBooks = () => {
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
      id: 1,
      name: "Alice in Wonderland",
      author: "Lewis Carroll",
      genre: "fantasy",
      no_copyright: false,
      publisher: "Stalag",
    },
    {
      id: 1,
      name: "The Stranger",
      author: "Albert Camus",
      genre: "thriller",
      no_copyright: false,
      publisher: "Stalag",
    },
  ];
  // Generate Columns based on book keys
  let books_table = document.getElementById("books");
  let table_head = books_table.createTHead();
  let books_table_head_row = table_head.insertRow();
  // Loop all keys, insert them as columns. Lets assume all objects have the same keys, therefore we grab
  // All keys from the first object in the array
  Object.keys(books[0]).map((book_key) => {
    let book_column = document.createElement("th");
    let book_column_content = document.createTextNode(book_key);
    book_column.appendChild(book_column_content);
    books_table_head_row.appendChild(book_column);
  });

  // Generate Rows based on each book properties
  table_body = books_table.createTBody();
  books.map((book) => {
    let book_table_body_row = books_table.insertRow();
    Object.keys(book).map((key) => {
      let cell = book_table_body_row.insertCell();
      let cell_content = document.createTextNode(book[key]);
      cell.appendChild(cell_content);
    });
  });
};
const init = () => {
  fetchBooks();
};

import express from "express";

const app = express();
app.use(express.json());

let books = [
  {
    id: 1,
    title: "The Alchemist",
    author: "Paulo Coelho",
    price: 350,
    category: "Fiction"
  },
  {
    id: 2,
    title: "Atomic Habits",
    author: "James Clear",
    price: 450,
    category: "Self-help"
  },
  {
    id: 3,
    title: "Rich Dad Poor Dad",
    author: "Robert Kiyosaki",
    price: 300,
    category: "Finance"
  }
];

// GET /books - retrieve all books
app.get("/books", (req, res) => {
  res.status(200).json(books);
});

// GET /books/:id - retrieve one book
app.get("/books/:id", (req, res) => {
  const book = books.find(item => item.id === Number(req.params.id));

  if (!book) {
    return res.status(404).json({ message: "Book not found" });
  }

  res.status(200).json(book);
});

// POST /books - add a book
app.post("/books", (req, res) => {
  const { id, title, author, price, category } = req.body;

  if (
    id === undefined ||
    !title ||
    !author ||
    price === undefined ||
    !category
  ) {
    return res.status(400).json({
      message: "Required fields: id, title, author, price and category"
    });
  }

  if (books.some(item => item.id === Number(id))) {
    return res.status(400).json({ message: "Book ID already exists" });
  }

  const newBook = {
    id: Number(id),
    title,
    author,
    price: Number(price),
    category
  };

  books.push(newBook);

  res.status(201).json({
    message: "Book added successfully",
    book: newBook
  });
});

// PUT /books/:id - update a book
app.put("/books/:id", (req, res) => {
  const bookId = Number(req.params.id);
  const index = books.findIndex(item => item.id === bookId);

  if (index === -1) {
    return res.status(404).json({ message: "Book not found" });
  }

  const { title, author, price, category } = req.body;

  if (
    (title !== undefined && !title) ||
    (author !== undefined && !author) ||
    (price !== undefined && Number.isNaN(Number(price)))
  ) {
    return res.status(400).json({ message: "Invalid book details" });
  }

  books[index] = {
    ...books[index],
    ...(title !== undefined && { title }),
    ...(author !== undefined && { author }),
    ...(price !== undefined && { price: Number(price) }),
    ...(category !== undefined && { category })
  };

  res.status(200).json({
    message: "Book updated successfully",
    book: books[index]
  });
});

// DELETE /books/:id - delete a book
app.delete("/books/:id", (req, res) => {
  const bookId = Number(req.params.id);
  const index = books.findIndex(item => item.id === bookId);

  if (index === -1) {
    return res.status(404).json({ message: "Book not found" });
  }

  const deletedBook = books.splice(index, 1)[0];

  res.status(200).json({
    message: "Book deleted successfully",
    book: deletedBook
  });
});

// Handle invalid routes
app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

// Handle invalid JSON and other errors
app.use((err, req, res, next) => {
  if (err instanceof SyntaxError && "body" in err) {
    return res.status(400).json({ message: "Invalid JSON data" });
  }

  res.status(500).json({ message: "Internal server error" });
});

app.listen(4000, () => {
  console.log("Express Server running at http://localhost:4000");
});

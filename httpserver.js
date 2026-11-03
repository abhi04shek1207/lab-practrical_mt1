import http from "http";
import fs from "fs";

let books = [
  { id: 1, title: "The Alchemist", author: "Paulo Coelho", price: 350 },
  { id: 2, title: "Atomic Habits", author: "James Clear", price: 450 },
  { id: 3, title: "Rich Dad Poor Dad", author: "Robert Kiyosaki", price: 300 }
];

const server = http.createServer((req, res) => {
  // GET /
  if (req.url === "/" && req.method === "GET") {
    res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
    res.end("<h1>Welcome to Library Book Management System</h1>");
  }

  // GET /books
  else if (req.url === "/books" && req.method === "GET") {
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(books));
  }

  // GET /about
  else if (req.url === "/about" && req.method === "GET") {
    res.writeHead(200, { "Content-Type": "text/plain; charset=utf-8" });
    res.end("Library Book Management Application using Node.js");
  }

  // GET /home - serve HTML using the FS module
  else if (req.url === "/home" && req.method === "GET") {
    fs.readFile("./public/index.html", "utf8", (err, data) => {
      if (err) {
        res.writeHead(500, { "Content-Type": "text/plain; charset=utf-8" });
        res.end("Error reading HTML file");
      } else {
        res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
        res.end(data);
      }
    });
  }

  // POST /add-book
  else if (req.url === "/add-book" && req.method === "POST") {
    let body = "";

    req.on("data", chunk => {
      body += chunk;
    });

    req.on("end", () => {
      try {
        const book = JSON.parse(body);

        if (
          book.id === undefined ||
          !book.title ||
          !book.author ||
          book.price === undefined
        ) {
          res.writeHead(400, { "Content-Type": "application/json" });
          res.end(JSON.stringify({ message: "Required fields: id, title, author and price" }));
          return;
        }

        if (books.some(item => item.id === book.id)) {
          res.writeHead(400, { "Content-Type": "application/json" });
          res.end(JSON.stringify({ message: "A book with this ID already exists" }));
          return;
        }

        books.push(book);
        res.writeHead(201, { "Content-Type": "application/json" });
        res.end(JSON.stringify({
          message: "Book added successfully",
          book: book
        }));
      } catch (error) {
        res.writeHead(400, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ message: "Invalid JSON data" }));
      }
    });
  }

  // Invalid route or method
  else {
    res.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
    res.end("404 Page Not Found");
  }
});

server.listen(3000, () => {
  console.log("HTTP Server running at http://localhost:3000");
});

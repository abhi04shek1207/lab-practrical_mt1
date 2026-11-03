# Library Book Management Web Application

## Setup
```bash
npm install
```

## Part A: Node.js HTTP server
```bash
node httpserver.js
```
Open `http://localhost:3000/`, `/books`, `/about`, and `/home`.

POST `http://localhost:3000/add-book` with JSON:
```json
{
  "id": 4,
  "title": "Clean Code",
  "author": "Robert C. Martin",
  "price": 550
}
```

## Part B: Express REST API
Open a second terminal and run:
```bash
node expressApp.js
```
The API runs at `http://localhost:4000`.

| Method | Endpoint | Purpose |
|---|---|---|
| GET | `/books` | Get all books |
| GET | `/books/:id` | Get one book |
| POST | `/books` | Add a book |
| PUT | `/books/:id` | Update a book |
| DELETE | `/books/:id` | Delete a book |

Use JSON request bodies for POST and PUT. Data is stored in JavaScript arrays and resets when the server restarts.

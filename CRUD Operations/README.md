# Node.js + Express + MongoDB CRUD API

This folder contains a complete setup for 4 RESTful APIs (Create, Read, Update, Delete) using Node.js, ExpressJS, and MongoDB.

## Setup Instructions

### 1. Prerequisites
- **Node.js**: Ensure Node.js is installed on your system.
- **MongoDB Atlas**: You need a MongoDB Atlas account and a cluster.
  - Open the `.env` file created in this folder.
  - Replace the placeholder `MONGODB_URI` with your actual Atlas connection string.

### 2. Install Dependencies
Open your terminal in this `CRUD operations` folder and run:
```bash
npm install
```

### 3. Run the Server
You can start the server using:
```bash
npm start
```
*(The server will start on `http://localhost:5000`)*

---

## The 4 API Endpoints (CRUD)

We are managing a collection called `Items` (which have a `name`, `description`, and `price`).
Base URL: `http://localhost:5000/api/items`

### 1. CREATE (POST)
- **URL**: `POST http://localhost:5000/api/items`
- **Body (JSON)**:
  ```json
  {
    "name": "Laptop",
    "description": "A high-performance laptop",
    "price": 1200
  }
  ```

### 2. READ (GET)
- **URL**: `GET http://localhost:5000/api/items`
- **Description**: Fetches all the items stored in the database.

### 3. UPDATE (PUT)
- **URL**: `PUT http://localhost:5000/api/items/<ITEM_ID>`
- *(Replace `<ITEM_ID>` with the actual `_id` of the document you want to update)*
- **Body (JSON)**:
  ```json
  {
    "price": 1100
  }
  ```

### 4. DELETE (DELETE)
- **URL**: `DELETE http://localhost:5000/api/items/<ITEM_ID>`
- *(Replace `<ITEM_ID>` with the actual `_id` of the document you want to delete)*
- **Description**: Deletes the specific item from the database.

---
**Tip:** You can test these APIs easily using tools like [Postman](https://www.postman.com/) or [Thunder Client](https://www.thunderclient.com/) (VS Code extension).

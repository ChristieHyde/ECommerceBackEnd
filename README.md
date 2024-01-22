# E-Commerce Back End

## Description
This project is a database integration application to function as the backend of an e-commerce website. It uses API calls to view, update and delete products, as well as descriptive categories and tags, to manage the stock of an online store.

## Installation
This project will need to be integrated manually with the user's SQL database and front-end application. Inquire through email.

## Usage
A demonstration video is provided: https://app.screencastify.com/v3/watch/cNAnZQ3KFGSa82lNQSka

Once the server and database are live, the user can use API calls to make queries to the database, receiving the output in JSON format.
The following API routes are available, servicing their respective tables:
- products
- categories
- tags
with the following calls being supported:
- GET: Retrieves all of the items in the table, with individual entries retrievable by their ID.
- POST: Add a new entry to the table, with the request body supplying the item details.
- PUT: Edit an entry to the table, specified by ID.
- DELETE: Delete an entry to the table, specified by ID.
Examples:
- GET /api/products - Returns every product in the database.
- GET /api/products/x - Return the product with ID x.
- POST /api/products
- PUT /api/products/x
- DELETE /api/products/x

## Credit
This project uses the following NPM packages:
- dotenv
- express
- mysql2
- sequelize
Base code was provided by the University of Western Australia Coding Bootcamp.
Other code was written by Christie Hyde for this project.
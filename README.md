# Express TypeScript API with Prisma and Authentication

This project is a RESTful API built with Express.js and TypeScript, using Prisma ORM for database operations and JWT for authentication. It includes CRUD operations for posts and user authentication.

<p align="center">
  <a href="#features">Features</a> •
  <a href="#prerequisites">Prerequisites</a> •
  <a href="#installation">Installation</a> •
  <a href="#usage">Usage</a> •
  <a href="#api-documentation">API Docs</a> •
  <a href="#contributing">Contributing</a> •
  <a href="#license">License</a>
</p>

## 🚀 Features

- 👤 User registration and login
- 🔐 JWT-based authentication
- 📝 CRUD operations for posts
- 🐘 PostgreSQL database with Prisma ORM
- 📚 Swagger API documentation
- 🚨 Comprehensive error handling and logging
- 🌐 CORS support

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- Node.js (v14 or later)
- npm or yarn
- PostgreSQL database (We're using Neon Postgres)

## 🛠 Installation

1. Clone the repository:

git clone https://github.com/azharhussain/Express-TypeScript-API-with-Prisma-and-Authentication.git
cd your-repo-name

2. Install the dependencies:

npm install


3. Set up your environment variables:
Create a `.env` file in the root directory and add the following:

DATABASE_URL="your_postgresql_connection_string"
JWT_SECRET="your_jwt_secret"
PORT=1000

4. Set up the database:

npx prisma migrate dev --name init

## Usage

To start the development server:

npm run dev

The server will start on `http://localhost:1000` (or the port you specified in the .env file).

## API Documentation

Once the server is running, you can access the Swagger API documentation at:

http://localhost:1000/api-docs

## API Endpoints

- `POST /api/auth/register`: Register a new user
- `POST /api/auth/login`: Login a user
- `GET /api/posts`: Get all posts
- `GET /api/posts/:id`: Get a specific post
- `POST /api/posts`: Create a new post (requires authentication)
- `PUT /api/posts/:id`: Update a post (requires authentication)
- `DELETE /api/posts/:id`: Delete a post (requires authentication)

## Testing

You can use the provided Postman collection to test the API endpoints. Import the collection into Postman and update the `authToken` variable with a valid JWT token after logging in.

## Logging

Logs are written to `error.log` for errors and `combined.log` for all logs. In development mode, logs are also printed to the console.

## Contributing

Contributions to this project are welcome. Please follow these steps:

1. Fork the repository
2. Create a new branch (`git checkout -b feature/your-feature-name`)
3. Make your changes
4. Commit your changes (`git commit -am 'Add some feature'`)
5. Push to the branch (`git push origin feature/your-feature-name`)
6. Create a new Pull Request

## License

This project is licensed under the MIT License.

## Contact

If you have any questions or feedback, please contact Azhar Hussain (https://www.azharhussain.net) at azharfastian@gmail.com.

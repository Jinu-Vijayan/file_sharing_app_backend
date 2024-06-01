# File Sharing App Backend

This is a Node.js server that allows you to share files using the Express.js framework. The server includes routes for user management and file handling.

## Features

- Handles user sign up and sign in
- Handles file upload and download
- Provides a simple API endpoint to upload and download files
- Handles errors and returns appropriate responses

## Prerequisites

- Node.js installed on your system
- `dotenv` package installed `(npm install dotenv)`
- `express` package installed `(npm install express)`
- `jsonwebtoken` package installed `(npm install jsonwebtoken)`
- `mongoose` package installed `(npm install mongoose)`
- `multer` package installed `(npm install multer)`
- `uuid` package installed `(npm install uuid)`
- `nodemon` package installed `(npm install nodemon)`

## Installation

1) Clone the repository:

```bash
git clone https://github.com/Jinu-Vijayan/file_sharing_app_backend.git
```

2) Navigate to the project directory:

```bash
cd ./file_sharing_app_backend
```

3) Install the required dependencies:

```bash
npm install
```

4) Create a `.env` file in the root directory and add the following environment variables:


- SALT_ROUNDS = Used for password hashing.
- JWT_PRIVATE_KEY = your-private-key
- PORT = The port number for the server.(The default value is 10000)
- MONGOURI = The MongoDB connection URI.

5) Create a folder named `uploads` in the root folder of the repo so that the application will work as intented.

## Usage

1) Start server

```bash
npm start
```

2) The server will start running on the specified port (default is 10000).

## User Routes

### Sign Up

- Route: `/signUp`
- Method: `POST`
- Controller: `signUp`

### Sign In

- Route: `/signIn`
- Method: `GET`
- Controller: `signIn`

## File Routes

### Upload File

Route: `/uploadFile`
Method: `POST`
Middleware: `Auth`
Controller: `uploadFile`

### Generate Download Link

Route: `/:uuid`
Method: `GET`
Controller: `generateDownloadLink`

### Download File

Route: `/download/:uuid`
Method: `GET`
Controller: `downloadFile`

## Error Handling

The server handles errors and returns appropriate HTTP status codes and error messages. If an error occurs during file handling, the server will return a 500 Internal Server Error response with an error message.

## Development

- The application uses `nodemon` for development and testing.
- It is designed to be scalable and efficient for handling large numbers of users and files.
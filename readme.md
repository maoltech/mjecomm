# Ecommerce Project

Welcome to our Ecommerce Project! This project was developed as part of a job interview showcase to demonstrate various skills including unit testing, Mongoose MongoDB integration, Node.js, Express, TypeScript, input validation, JWT authentication, and creation and management of a product store.

## Features

1. **Unit Testing**: We have implemented comprehensive unit tests to ensure the reliability and robustness of the application.
2. **Mongoose MongoDB**: MongoDB is used as the database, and Mongoose is used as the ODM (Object Document Mapper) to interact with MongoDB in an efficient and type-safe manner.
3. **Node.js & Express**: The backend of the application is built using Node.js and Express, providing a scalable and efficient server environment.
4. **TypeScript**: TypeScript is used to add static typing to JavaScript, making the codebase more maintainable and less error-prone.
5. **Input Validation**: Input validation is implemented to ensure that the data entered by users is correct and secure.
6. **JWT Authentication**: JSON Web Tokens (JWT) are used for user authentication, providing a secure and stateless authentication mechanism.
7. **Wallet Creation**: Users can create wallets to manage their funds securely within the application.
8. **Product Store**: The application includes features for the creation and management of a product store, allowing users to buy and sell products.

## Setup Instructions

1. **Clone the Repository**: 
    ```bash
    git clone https://github.com/maoltech/mjecomm.git
    cd mjecomm
    ```

2. **Install Dependencies**: 
    ```bash
    npm install
    ```

3. **Set Environment Variables**: 
    Create a `.env` file in the root directory and add the necessary environment variables such as MongoDB connection URI, JWT secret key, etc.

4. **Run the Application**: 
    ```bash
    npm start
    ```

5. **Testing**: 
    Run unit tests to ensure everything is working correctly:
    ```bash
    npm test
    ```

## API Documentation

The API documentation can be found [here](<https://documenter.getpostman.com/view/17573483/2sA35Ba43G>).

## Folder Structure

- **`src/`**: Contains the source code of the application.
  - **`controllers/`**: Controllers for handling various routes and business logic.
  - **`models/`**: Mongoose models for defining the schema of the database collections.
  - **`routes/`**: Express routes for defining the API endpoints.
  - **`middlewares/`**: Middleware functions for request processing.
  - **`utils/`**: Utility functions used across the application.
  - **`tests/`**: Unit tests for testing various components of the application.
  - **`services/`**: Service contains the handling of logic and interaction with models.
  - **`validations/`**: Validation functions for input validation.
- **`docs/`**: Contains documentation files.
  - **`api.md`**: Documentation of the API endpoints.
  - **`database.md`**: Documentation related to the database schema and structure.

## Contributing

Contributions are welcome! If you find any issues or have suggestions for improvements, feel free to open an issue or create a pull request.

## Contact

For any inquiries or questions regarding the project, please contact Maoltech.

Thank you for checking out our Ecommerce Project! We hope you find it helpful and informative.

# Node.js-Projects

# 🐾 Animal Shelter App
The Animal Shelter App is a full-stack web application built with Node.js and Express for managing animal adoptions. It integrates MongoDB as the database, ensuring the efficient handling of animal and adoption data.

Key Features ✨

- Database: The app uses MongoDB with Mongoose to model entities such as Animals and Adoptions, providing smooth data operations.
- Adoptions: Track and manage animal adoptions with full CRUD functionality, including the ability to create, update, and delete records.
- Animals: Manage details of shelter animals, including type, breed, age, and status (available/adopted).
- Validation: Joi is used for input validation, ensuring that only valid data is processed for animals and adoptions.
- API Routes: Organized RESTful API routes for handling requests related to animals and adoptions.
- Environment Configuration: Secure management of environment variables using dotenv for database connections.
- CRUD Operations: Implement full CRUD for both animals and adoptions, allowing smooth management of data.

# 📝 Post Management App
The Post Management App is a feature-rich application built with Node.js and Express to allow users to create, like, update, and delete posts. It utilizes MongoDB for persistent storage, and includes full user authentication using bcrypt for password security and session handling.

Key Features ✨

- Database: The app uses MongoDB for storing posts, users, and likes data.
- User Authentication: Includes user registration and login functionality with bcrypt for secure password hashing, and express-session for session management.
- Post Management: Users can create, update, delete, and like posts. Posts are uniquely identified using UUID.
- Like Functionality: Users can like or unlike posts, but they cannot like their own posts, ensuring fairness.
- Validation: All input data, such as posts and user credentials, are validated using Joi to maintain data integrity.
- Session-Based Authentication: Users must be logged in to perform actions such as creating, liking, or deleting posts, enforced through session validation.
- Data Handling: Posts and users are stored in JSON files for simplicity, using fs for read/write operations.
- API Documentation: The application provides RESTful API endpoints for managing posts and users, easily testable using Postman.
- This app allows users to express their thoughts through posts, while managing posts with simple yet effective CRUD functionality.

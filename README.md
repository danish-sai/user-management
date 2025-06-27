Here’s a professional and well-structured `README.md` file for your Express.js user management API project:

---

````markdown
# User Management

A simple RESTful API built with **Node.js**, **Express**, and **MongoDB** for managing users. This includes user creation, reading, updating, deleting (optional), and authentication (login) functionalities.

---

## 📦 Features

- Create a new user with hashed password
- Retrieve all users (excluding passwords)
- Retrieve a specific user by ID
- Update user details
- User login with email and password
- Environment configuration using `.env`

---

## 🛠️ Technologies Used

- Node.js
- Express.js
- MongoDB + Mongoose
- bcrypt for password hashing
- dotenv for environment variables

---

## 🧾 API Endpoints

### 1. Root
**GET /**  
Returns a welcome message.  
**Response**: `Hello World!`

---

### 2. Register User  
**POST /user**  
Creates a new user.  

**Request Body**:
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "yourpassword"
}
````

**Success Response**:

```json
{
  "message": "User created successfully",
  "user": {
    "name": "John Doe",
    "email": "john@example.com"
  }
}
```

---

### 3. Get All Users

**GET /user**
Returns a list of all users (password excluded).

---

### 4. Get Single User

**GET /user/\:id**
Returns details of a user by ID (password excluded).

---

### 5. Update User

**PUT /user/\:id**
Updates the user details by ID.

**Request Body**:

```json
{
  "name": "Updated Name",
  "email": "updated@example.com",
  "password": "newpassword"
}
```

**Success Response**:

```json
{
  "message": "User updated successfully",
  "user": {
    "name": "Updated Name",
    "email": "updated@example.com"
  }
}
```

---

### 6. Login

**POST /login**
Authenticates user credentials.

**Request Body**:

```json
{
  "email": "john@example.com",
  "password": "yourpassword"
}
```

**Success Response**:

```json
{
  "message": "Login successful",
  "user": {
    "name": "John Doe",
    "email": "john@example.com"
  }
}
```

---

## 🧰 Project Setup

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/user-management-api.git
cd user-management-api
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment Variables

Create a `.env` file in the root directory with the following variables:

```
PORT=5000
MONGO_URI=your_mongodb_connection_string
```

### 4. Run the Server

```bash
node index.js
```

Server will start at: [http://localhost:5000](http://localhost:5000)

---

## 🧩 Folder Structure

```
.
├── index.js
├── .env
├── package.json
├── /src
│   ├── DB
│   │   └── db.js
│   └── Schemas
│       └── user.js
```

---

## 🛡️ Notes

* Passwords are securely hashed using bcrypt.
* No sensitive information is returned in API responses.
* Extend this project by adding JWT authentication and user roles.

---

## 📬 License

This project is open-source and available under the [MIT License](LICENSE).

```

---

Let me know if you’d like to include `DELETE` functionality or JWT auth, and I can update the README accordingly.
```

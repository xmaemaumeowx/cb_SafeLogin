# SafeLogin

A secure login and registration system built with Node.js, Express, MongoDB, and EJS.

---

## Features

- User registration with hashed passwords
- User login with password verification
- Frontend UI
- Stores user data securely in MongoDB
- Easy to customize and expand

---

## Prerequisites

- Node.js and npm installed
- MongoDB Atlas account with a cluster set up
- Basic knowledge of JavaScript and Git

---

## Installation

1. Clone this repository:
```bash
git clone https://github.com/xmaemaumeowx/cb_SafeLogin.git
cd your-repo
```
2. Install dependencies:
```bash
npm install
```
3. Configure your MongoDB connection:
In index.js, update the connection string with your MongoDB Atlas URI, including your database name.

4. Start the server:
```bash
node index.js
```
## Usage
Open your browser and go to http://localhost:3000
Use the signup page to create a new account
Then log in with your email and password

## Folder Structure
```
/cb_SafeLogins
│
├── index.js          # Main server code
├── config.js         # Mongoose models and schemas
├── views/            # EJS templates (login.ejs, signup.ejs)
├── public/           # Static assets (CSS, images, JS)
└── package.json      # Dependencies and scripts
```
## License
This project is licensed under the MIT License.

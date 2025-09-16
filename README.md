# SafeLogin

A secure login and registration system built with Node.js, Express, MongoDB, EJS, and Google Authentication.

---

## Features

- User registration with strong password validation and hashing
- User login with session authentication
- Login/signup with Google account support
- Frontend UI with toast notifications for feedback
- Secure user data storage in MongoDB
- Easy to customize and expand

---

## Prerequisites

- [Node.js](https://nodejs.org/) and npm installed
- MongoDB Atlas account and cluster, or local MongoDB
- Google Cloud project with OAuth credentials (for Google login)
- Basic knowledge of JavaScript and Git

---

## Installation

1. **Clone this repository:**
```
   git clone https://github.com/xmaemaumeowx/cb_SafeLogin.git
   cd cb_SafeLogin
```
2. Install dependencies:
```
npm install
```

3. Set up environment variables:
Create a .env file in the root directory and add:
```
MONGODB_URI=your_mongodb_connection_string
SESSION_SECRET=your_session_secret
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
```

4. (Optional) Update MongoDB URI:
In .env, provide your MongoDB Atlas URI .

5. Start the Server
```
node src/index.js
```
## Usage
Open your browser and go to http://localhost:3000
Use the signup page to create a new account manually, or sign up/login via Google
Log in and access your home/dashboard page

## Folder Structure
```
cb_SafeLogin/
│
├── src/
│   ├── index.js         # Main server code
│   ├── models/
│   │     └── user.js    # Mongoose user schema/model
│   └── views/           # EJS templates (login.ejs, signup.ejs, home.ejs)
├── public/              # Static assets (CSS, images, JS)
├── .env                 # Environment variables (not committed)
└── package.json         # Dependencies and scripts
```
## Environment Variables
Make sure your .env file contains:
```
MONGODB_URI=your_mongodb_connection_string
SESSION_SECRET=your_session_secret
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
```

## License
This project is licensed under the MIT License.

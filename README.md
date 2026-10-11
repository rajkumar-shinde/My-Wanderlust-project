# WanderLust 🌍

WanderLust is a travel accommodation listing web application built using Node.js, Express.js, MongoDB, and EJS. It allows users to explore places to stay, create and manage accommodation listings, and share reviews with star ratings.

## 🌐 Live Demo

[Visit WanderLust](https://wanderlust-688j.onrender.com/)

## 📂 GitHub Repository

[My-Wanderlust-project](https://github.com/rajkumar-shinde/My-Wanderlust-project)

## ✨ Features

- **User Authentication:** Sign up, log in, and log out securely.
- **Create Listings:** Authenticated users can create new accommodation listings.
- **Manage Listings:** Listing owners can edit and delete their own listings.
- **Reviews and Ratings:** Users can submit reviews and star ratings.
- **Owner-Based Authorization:** Restricts listing modifications to the listing owner.
- **Interactive Maps:** Display listing locations using Mapbox.
- **Image Hosting:** Upload and display listing images using Cloudinary.
- **Responsive Design:** User interface built with Bootstrap and custom CSS.

## 🛠️ Tech Stack

**Frontend**

- HTML5
- CSS3
- JavaScript
- EJS
- Bootstrap

**Backend**

- Node.js
- Express.js
- Passport.js
- Joi

**Database**

- MongoDB
- Mongoose

**Services and Tools**

- Mapbox
- Cloudinary
- Git and GitHub
- Render

## 📁 Project Structure

```text
My-Wanderlust-project/
├── controllers/
├── models/
├── routes/
├── views/
│   ├── layouts/
│   ├── listings/
│   ├── users/
│   └── includes/
├── public/
│   ├── css/
│   └── js/
├── app.js
├── middleware.js
├── schema.js
├── package.json
├── package-lock.json
├── .gitignore
└── README.md
```

_Note: This is a representative project structure. Your actual files and folders may differ._

## ⚙️ Installation and Setup

### Prerequisites

- Node.js and npm
- MongoDB Atlas account or a local MongoDB installation
- Mapbox access token
- Cloudinary account and credentials

### 1. Clone the Repository

```bash
git clone https://github.com/rajkumar-shinde/My-Wanderlust-project.git
cd My-Wanderlust-project
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment Variables

Create a `.env` file in the root directory of the project.

Add the environment variables required by your application. The following are examples; use the exact names expected by your code.

```env
ATLASDB_URL=your_mongodb_connection_string
SECRET=your_session_secret
MAP_TOKEN=your_mapbox_access_token
CLOUD_NAME=your_cloudinary_cloud_name
CLOUD_API_KEY=your_cloudinary_api_key
CLOUD_API_SECRET=your_cloudinary_api_secret
```

For local MongoDB, use the local connection string expected by your application's configuration.

**Security:** Never upload your `.env` file or private credentials to GitHub. Ensure `.env` is included in `.gitignore`.

### 4. Run the Application

```bash
node app.js
```

Open the local URL displayed in your terminal. The port depends on your application's configuration.

## 🗄️ Database

WanderLust supports MongoDB through:

- **MongoDB Atlas:** Cloud-hosted database.
- **Local MongoDB:** Database running on your local machine.

Configure the appropriate connection string through your environment variables.

## ☁️ Deployment

The live application is deployed on Render.

To deploy your own instance:

1. Push the project repository to GitHub.
2. Create a Web Service on Render and connect your repository.
3. Set the build command to `npm install`.
4. Set the start command to `node app.js`.
5. Configure the required environment variables in Render.
6. Deploy and test the application's main features.

## 🔐 Security

- Keep API keys, database credentials, and session secrets private.
- Use environment variables for sensitive configuration.
- Enforce authentication and authorization on the server.
- Ensure users can modify only the listings they own.

## 🚀 Future Improvements

- Search listings by destination.
- Add price and category filters.
- Implement pagination.
- Add user profile management.
- Improve accessibility and mobile responsiveness.

## 👨‍💻 Author

**Rajkumar Shinde**

- **GitHub:** [rajkumar-shinde](https://github.com/rajkumar-shinde)
- **LinkedIn:** [rajkumar-shinde-rs](https://www.linkedin.com/in/rajkumar-shinde-rs/)

## 📄 License

No license has been specified yet. Add a `LICENSE` file if you decide to distribute this project under an open-source license.

# WanderLust 🌍

A travel accommodation listing web application built with Node.js, Express.js, MongoDB, and EJS. WanderLust lets users explore places to stay, create and manage listings, and share reviews with star ratings.

## 🌐 Live Demo

**[Visit WanderLust](https://wanderlust-688j.onrender.com/)**

## 📦 GitHub Repository

[My-Wanderlust-project](https://github.com/rajkumar-shinde/My-Wanderlust-project)

## ✨ Features

- **User Authentication:** Sign up, log in, and log out.
- **Listing Management:** Create, edit, and delete accommodation listings.
- **Reviews & Ratings:** Add reviews and star ratings to listings.
- **Owner-Based Authorization:** Restrict listing modifications to the listing owner.
- **Interactive Maps:** Display listing locations using Mapbox.
- **Image Hosting:** Store and serve listing images through Cloudinary.

## 🛠️ Tech Stack

- **Backend:** Node.js, Express.js
- **Database:** MongoDB, Mongoose
- **Templating & UI:** EJS, Bootstrap
- **Authentication:** Passport.js
- **Validation:** Joi
- **Maps:** Mapbox
- **Image Hosting:** Cloudinary
- **Deployment:** Render

## 📁 Project Structure

The following is a representative structure. Your exact files and folders may differ.

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

## ⚙️ Getting Started

Follow these steps to run the project locally.

### Prerequisites

- [Node.js](https://nodejs.org/) and npm
- MongoDB running locally, or a MongoDB Atlas connection string
- Mapbox access token
- Cloudinary account and credentials

### 1. Clone the repository

```bash
git clone https://github.com/rajkumar-shinde/My-Wanderlust-project.git
cd My-Wanderlust-project
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Create a `.env` file in the project root. Add the environment variables required by your application, using the exact names referenced in your code.

Example placeholders (adjust names to match your project configuration):

```env
ATLASDB_URL=your_mongodb_atlas_connection_string
SECRET=your_session_secret
MAP_TOKEN=your_mapbox_access_token
CLOUD_NAME=your_cloudinary_cloud_name
CLOUD_API_KEY=your_cloudinary_api_key
CLOUD_API_SECRET=your_cloudinary_api_secret
```

If you use a local MongoDB database, configure the local connection string expected by your application instead of, or alongside, the Atlas connection string.

**Important:** Never commit your `.env` file, database credentials, API secrets, or session secrets to GitHub. Add `.env` to `.gitignore`.

### 4. Start the application

```bash
node app.js
```

Open the local URL and port configured in `app.js`. If you have not changed the default port, check the terminal output for the address printed by the application.

## 🗄️ Database

WanderLust supports running with either:

- **MongoDB Atlas** — a cloud-hosted MongoDB database.
- **Local MongoDB** — a MongoDB instance running on your machine.

Use the connection string and environment variable names expected by your application's configuration.

## ☁️ Deployment

The live application is hosted on **Render**.

To deploy your own copy:

1. Push the repository to GitHub.
2. Create a Web Service on Render and connect the repository.
3. Set the build command to `npm install`.
4. Set the start command to `node app.js`.
5. Add the required environment variables in Render's environment settings.
6. Deploy and test authentication, listings, reviews, maps, and image loading.

## 🔐 Security Notes

- Keep secrets and API credentials in environment variables.
- Do not commit `.env` or other files containing private credentials.
- Ensure owner-based authorization is enforced on the server, not only by hiding buttons in the UI.

## 🔮 Possible Future Improvements

- Search and filter listings by location or price.
- Add listing categories and pagination.
- Improve accessibility and mobile usability.
- Add user profile management.

## 👨‍💻 Author

**Rajkumar Shinde**

- **GitHub:** [rajkumar-shinde](https://github.com/rajkumar-shinde)
- **LinkedIn:** [rajkumar-shinde-rs](https://www.linkedin.com/in/rajkumar-shinde-rs/)

## 📄 License

No license has been specified yet. Add a `LICENSE` file if you decide to distribute this project under an open-source license.

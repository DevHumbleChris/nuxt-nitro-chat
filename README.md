# Nuxt Nitro Chat 🚀

Welcome to Nuxt Nitro Chat! 💬✨

This Nuxt app uses experimental web sockets for real-time group chat in Nuxt.js. Dive into the world of real-time communication with this innovative project.

## Table of Contents

- [Features](#features)
- [Demo](#demo)
- [Installation](#installation)
- [Usage](#usage)
- [Contributing](#contributing)

## Features

- Real-time group chat
- Nuxt.js framework
- MySQL (Prisma ORM)
- Shadcn UI
- Cloudinary
- Experimental web sockets for instant messaging

## Demo

<video controls>
  <source src="./public/video/nuxt-nitro-demo.mp4" type="video/mp4">
</video>

## Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/DevHumbleChris/nuxt-nitro-chat.git
   cd nuxt-nitro-chat
   ```

2. **Update the .env using the example.env:**

   ```env
    DATABASE_URL=******
    NUXT_SESSION_PASSWORD=******
    NUXT_OAUTH_GITHUB_CLIENT_ID=******
    NUXT_OAUTH_GITHUB_CLIENT_SECRET=******
    NUXT_OAUTH_GOOGLE_CLIENT_ID =******
    NUXT_OAUTH_GOOGLE_CLIENT_SECRET =******

    AUTH_SECRET = ******
    AUTH_ORIGIN = "http://localhost:3000"

    CLOUDINARY_CLOUD_NAME = ******
    CLOUDINARY_CLOUD_API_KEY = ******
    CLOUDINARY_CLOUD_API_SECRET = ******
   ```

3. **Install dependencies:**
   ```bash
   npm install
   ```

## Usage

1. **Start the development server:**

   ```bash
   npm run dev
   ```

2. **Open your browser:**
   Navigate to `http://localhost:3000` to see the app in action.

## Contributing

We welcome contributions! Please follow these steps to contribute:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature-branch`).
3. Make your changes.
4. Commit your changes (`git commit -m 'Add some feature'`).
5. Push to the branch (`git push origin feature-branch`).
6. Open a pull request.

---

Happy chatting! If you encounter any issues, feel free to open an issue or submit a pull request.

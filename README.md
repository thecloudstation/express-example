# CloudStation Feature Manager

CloudStation Feature Manager is a web application that allows you to manage and showcase features for your SaaS product. It demonstrates service discovery capabilities by allowing switching between MongoDB and in-memory storage.

## Features

- Add, edit, and delete product features
- Categorize features (Core, Advanced, Additional)
- Track feature usage through link clicks
- Allow users to rate features
- Toggle between MongoDB and in-memory storage
- View feature statistics  

## Running Locally

1. Clone the repository:
   ```
   git clone https://github.com/thecloudstation/express_example
   cd express_example
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Set up environment variables:
   Create a `.env` file in the root directory and add the following:
   ```
   PORT=3000
   MONGODB_URL=your_mongodb_connection_string
   ```

4. Start the server:
   ```
   npm start
   ```
   For development with auto-restart:
   ```
   npm run dev
   ```

5. Access the application:
   - Admin Dashboard: http://localhost:3000/admin
   - User Interface: http://localhost:3000/user

## Tech Stack

- Node.js
- Express.js
- MongoDB (with option for in-memory storage)
- Vanilla JavaScript (frontend)

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is open source and available under the [MIT License](LICENSE).
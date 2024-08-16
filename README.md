<div align="center">
  <a href="https://cloud-station.io">
    <img src="https://server.cloud-station.io/cloudstation/cs_icon.png" alt="CloudStation Logo" width="50">
  </a>
  <h3 align="center">CloudStation Feature Manager</h3>
  <p align="center">
    An Express.js application for managing and showcasing SaaS product features
    <br />
    <a href="https://cloud-station.io">Visit CloudStation</a> ·
    <a href="https://documentation.cloud-station.io/s/ce6e8846-8aec-4337-a850-5188b6dc6d6e">Documentation</a> ·
    <a href="https://blog.cloud-station.io">Blog</a>
  </p>
</div>

## Overview

CloudStation Feature Manager is a web application that allows you to manage and showcase features for your SaaS product. It demonstrates service discovery capabilities by allowing switching between MongoDB and in-memory storage.

## Features

- Add, edit, and delete product features
- Categorize features (Core, Advanced, Additional)
- Track feature usage through link clicks
- Allow users to rate features
- Toggle between MongoDB and in-memory storage
- View feature statistics

## Tech Stack

- Node.js
- Express.js
- MongoDB (with option for in-memory storage)
- Vanilla JavaScript (frontend)

## Running Locally

1. Clone the repository:
   ```
   git clone https://github.com/thecloudstation/express-example
   cd express_example
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Set up environment variables:
   Create a `.env` file in the root directory and add:
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

## Deployment on CloudStation

1. Sign up for a CloudStation account at [cloud-station.io](https://www.cloud-station.io/signup) if you don't have one.

2. Fork this repository.

3. Deploy the application:
   - Go to the CloudStation [Dashboard](https://www.cloud-station.io/dashboard/project).
   - Create a new project.
   - Click on `Add New` and select **GitHub**.
   - Choose the forked repository.
   - Select a subdomain (e.g., `express-features`) and click **Deploy**.

Your application will be accessible at https://express-features.cloud-station.app (replace 'express-features' with your chosen subdomain).

## Contributing

We welcome contributions to enhance this application. Feel free to fork the repository, create a feature branch, and submit a pull request.

## Support

For support, visit our [Help Center](https://documentation.cloud-station.io/s/ce6e8846-8aec-4337-a850-5188b6dc6d6e) or join our [Slack community](https://join.slack.com/t/cloudstationio/shared_invite/zt-20kougo40-Kd1196QzZ7bwUA0oPfZORA).

## Connect with Us

<p align="center">
  <a href="https://www.cloud-station.io/">Website</a> · 
  <a href="https://twitter.com/CloudStation_io">Twitter</a> · 
  <a href="https://join.slack.com/t/cloudstationio/shared_invite/zt-20kougo40-Kd1196QzZ7bwUA0oPfZORA">Slack</a>
</p>
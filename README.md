# Project Management System

This is a simple and efficient project management solution designed to help administrators manage projects, create structured work modules, assign team leaders, and add team members. The system focuses on clarity and ease of use while avoiding unnecessary complexity.

## Features

- **Project Creation** — Admins can create projects with descriptions.
- **Work Module Management** — Divide projects into work modules like sales or design.
- **Section-Based Organization** — Each module is divided into sections.
- **Team Leader Assignment** — Assign leaders to each section.
- **Team Member Management** — Add members to specific sections.
- **Single User Registration Form** — Simple registration with roles assigned later.
- **Simplified Interface** — Clean and user-friendly UI.

## Getting Started

### Prerequisites

Make sure you have the following installed:

- Node.js (Latest LTS recommended)
- MongoDB
- npm or yarn

### Installation

1. Clone the repository

   ```bash
   git clone <repository-url>
   cd project-management-system
   ```

2. Install backend dependencies

   ```bash
   cd backend
   npm install
   ```

3. Install frontend dependencies

   ```bash
   cd frontend
   npm install
   ```

4. Create a `.env` file in the backend directory and configure:

   ```
   PORT=5000
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_secret_key
   ```

5. Run the application
   ```bash
   npm start
   ```

## License

This project is licensed under the MIT License.

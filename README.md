# node-react-board-b

Backend README
markdown
Copy code
# Node React Board Backend

This is the backend service for the Node React Board application. It is built with Node.js, Express, and MongoDB.

## Getting Started

### Prerequisites

- Node.js
- MongoDB

### Installation

 Clone the repository:

```bash
git clone https://github.com/oivie/node-react-board-b.git
cd node-react-board-b/backend
Install dependencies:
bash
npm install

Create a .env file in the root directory with the following content:
env
MONGO_URI=<Your MongoDB connection string>
JWT_SECRET=<Your JWT secret>

Start the server:
bash
npm start
The server will start on http://localhost:5000.

API Endpoints
POST /api/auth/register: Register a new user
POST /api/auth/login: Login a user
GET /api/users/profile: Get user profile
PUT /api/users/profile: Update user profile
GET /api/events: Get all events
POST /api/events: Create a new event
PUT /api/events/:id: Update an event
DELETE /api/events/:id: Delete an event
Deployment
This backend is deployed on Render. You can access it at: https://node-react-board-backend.onrender.com.

License
This project is licensed under the MIT License.

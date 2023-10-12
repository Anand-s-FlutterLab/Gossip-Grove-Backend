# Gossip Grove Backend

## Overview

<b>Gossip Grove is a chat application with a Node.js backend that enables users to perform the following actions:</b>

- <b>Login:</b> Users can log in to their accounts securely.
- <b>Register:</b> New users can create accounts and join the Gossip Grove community.
- <b>One-on-One Chat:</b> Users can engage in private one-on-one conversations.
- <b>Edit Profile:</b> Users can customize and manage their profiles.

## Technologies Used

- <b>Node.js:</b> The backend is built on Node.js, a server-side JavaScript runtime.
- <b>Express.js:</b> We use Express.js to create a robust and scalable API.
- <b>MongoDB:</b> Our database of choice is MongoDB, a NoSQL database, for storing user information and chat
  data.
- <b>Socket.io:</b> We leverage socket.io for real-time communication features.
- <b>Firebase Cloud Messaging:</b>: When User is offline, it will send the message notification.

## Setup

### Prerequisites

- <b>Node.js:</b> Ensure you have Node.js installed on your system. You can download it from [here](https://nodejs.org/en).

### Installation

#### 1. Clone the Gossip Grove Backend repository to your local machine.

```
git clone https://github.com/Anand-s-FlutterLab/Gossip-Grove-Backend.git
cd gossip-grove-backend
```

#### 2. Install the project dependencies using npm.

```
npm install
```

#### 3. Set up environment variables by creating a .env file in the project root. You will need to define the following variables:

- <b>PORT:</b> The port on which the server will run.
- <b>MONGO_CONNECTION_URL:</b> The URI to your MongoDB database.
- <b>JWTKEY:</b> Key for Generating JWT
- <b>BCRYPT_SALT:</b> Salt for hashing password

#### 4. Start the server

```
npm start
```

## API Endpoints

The backend provides various API endpoints to handle user authentication, chat functionality, and profile management. Here are some of the essential endpoints:

### User:

|  End Point  | Method |  Description  | Auth Token Required |
| :---------: | :----: | :-----------: | :-----------------: |
|    user/    |  POST  |    Signup     |                     |
|    user/    |  GET   |     Login     |                     |
|  user/all   |  GET   | Get All Users |         ✅          |
| user/update |  PUT   |  Update User  |         ✅          |

### Chat:

|   End Point    | Method |         Description         | Auth Token Required |
| :------------: | :----: | :-------------------------: | :-----------------: |
|     chat/      |  POST  |         Start Chat          |         ✅          |
| chat/chatList/ |  GET   | Get User's Recent Chat List |         ✅          |
|     chat/      |  GET   |     Get Chat By Chat ID     |         ✅          |

### Server Status:

|      End Point       | Method |         Description         | Auth Token Required |
| :------------------: | :----: | :-------------------------: | :-----------------: |
| serverRunningStatus/ |  GET   | Check Server Running Status |                     |

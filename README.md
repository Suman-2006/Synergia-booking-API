# Synergia Event Booking API (MongoDB + Node.js + Express)

A simple RESTful API for managing **event bookings** using **Node.js**, **Express**, and **MongoDB**.  
This project performs **CRUD operations** and includes **search and filter** features for managing event bookings.

---

## Features

- Connects Node.js + Express with MongoDB using **Mongoose**
- Complete CRUD operations:
  - Create a booking
  - Read all bookings / booking by ID
  - Update booking details
  - Delete booking
- Query features:
  - Search bookings by email
  - Filter bookings by event name
- Follows REST API standards
- Includes validation for required fields

---

## Tech Stack

| Technology | Purpose |
|-------------|----------|
| Node.js | Backend runtime |
| Express.js | Web framework |
| MongoDB | Database |
| Mongoose | ODM for MongoDB |
| dotenv | Environment configuration |
| cors | Enable cross-origin requests |

---

## Project Setup

### Clone the Repository
```bash
git clone https://github.com/yourusername/synergia-event-booking-api.git
cd synergia-event-booking-api
```

### Install Dependencies
```bash
npm install express mongoose dotenv cors
```

### Create .env File
In the project root, create a file named .env and add your MongoDB connection string:
```
env
Copy code
PORT=3000
MONGODB_URI=mongodb://localhost:27017/synergiaDB
```

### Start the Server
```bash
Copy code
node server.js
```
The API should now be running at:http://localhost:3000

MongoDB Schema
```
js

{
  name: String,
  email: String,
  eventName: String,
  eventDate: Date,
  createdAt: { type: Date, default: Date.now }
}
```

API Endpoints
Method	Route	Description

| Method | Route                                 | Description              |
| ------ | ------------------------------------- | ------------------------ |
| GET    | `/api/bookings`                       | Get all bookings         |
| POST   | `/api/bookings`                       | Create a new booking     |
| GET    | `/api/bookings/:id`                   | Get booking by ID        |
| PUT    | `/api/bookings/:id`                   | Update booking details   |
| DELETE | `/api/bookings/:id`                   | Delete/cancel booking    |
| GET    | `/api/bookings/search?email=xyz`      | Search booking by email  |
| GET    | `/api/bookings/filter?event=Synergia` | Filter bookings by event |


Example Request Bodies (for Postman)

Create a Booking (POST /api/bookings)
```
json

{
  "name": "Aarav Mehta",
  "email": "aarav.mehta@example.com",
  "eventName": "AI & Robotics Workshop",
  "eventDate": "2025-11-06"
}
```
 
Update a Booking (PUT /api/bookings/:id)
```
json

{
  "name": "Aarav Mehta",
  "email": "aarav.mehta@example.com",
  "eventName": "AI & Robotics Workshop - Updated",
  "eventDate": "2025-11-10"
}
```

Query Examples

Search by Email
```
GET http://localhost:3000/api/bookings/search?email=aarav
Filter by Event
```

Filter by Email
```
GET http://localhost:3000/api/bookings/filter?event=synergia
```

Delete a Booking
```
DELETE http://localhost:3000/api/bookings/<id>
```

Sample Success Response
```
json

{
  "success": true,
  "message": "Booking created successfully",
  "data": {
    "_id": "672f8b1a9c21f2b1a8d92f1a",
    "name": "Aarav Mehta",
    "email": "aarav.mehta@example.com",
    "eventName": "AI & Robotics Workshop",
    "eventDate": "2025-11-06T00:00:00.000Z",
    "createdAt": "2025-10-31T11:40:00.000Z",
    "__v": 0
  }
}
```

Error Responses
HTTP Code	Meaning	Example Message
400	Bad Request	Missing required fields
404	Not Found	Booking not found
500	Server Error	Internal Server Error

Folder Structure
```
bash

synergia-event-booking-api/
│
├── server.js           # Main server file
├── .env                # Environment variables
├── package.json        # Dependencies and scripts
└── README.md           # Project documentation

```

Author
Suman Raju K
CSE Student | MERN Stack Developer


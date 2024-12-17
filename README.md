# **Campus EventHub API**

A Node.js/Express backend API designed for managing campus events, handling user authentication, event RSVPs, and more. Built with a MySQL database, it provides secure and efficient endpoints for event-related operations.

---

## **Table of Contents**

- [Overview](#overview)  
- [Features](#features)  
- [Installation](#installation)  
- [Usage](#usage)  
- [API Reference](#api-reference)  
- [Configuration](#configuration)  
- [Security Features](#security-features)  
- [Error Handling](#error-handling)  
- [Contributing](#contributing)  
- [License](#license)  
- [Support](#support)  
- [Acknowledgments](#acknowledgments)  

---

## **Overview**# Event Management System API

A Node.js/Express backend API for managing events, handling user registrations, and managing RSVPs with secure authentication and image upload capabilities.

## Table of Contents

    [Overview](#overview)
    [Features](#features)
    [Installation](#installation)
    [Usage](#usage)
    [API Reference](#api-reference)
    [Configuration](#configuration)
    [Contributing](#contributing)
    [License](#license)


## Overview
This system provides a complete backend solution for event management, featuring user authentication, event creation and management, RSVP handling, and image upload capabilities. Built with Node.js and PostgreSQL, it offers secure API endpoints for both admin and regular users.

## Features

    User authentication and authorization
    Event creation and management
    RSVP system
    Image upload for events
    Calendar view integration
    Role-based access control (Admin/User)
    Secure password handling
    PostgreSQL database integration


## Installation

### Prerequisites

    Node.js (v14 or higher)
    PostgreSQL (v12 or higher)
    npm or yarn


### Steps
# Clone repository
git clone [your-repository-url]

# Install dependencies
npm install

# Configure environment
cp .env.example .env

# Set up environment variables in .env
DATABASE_URL=postgresql://username:password@localhost:5432/database_name
PORT=4000
NODE_ENV=development

## Usage

### Starting the Server
# Development mode
npm run dev

# Production mode
npm start

### Default Admin Account
Email: admin@example.com
Password: admin123

## API Reference

### Authentication
# Register new user
POST /register
{
    "name": "string",
    "email": "string",
    "password": "string"
}

# Login
POST /login
{
    "email": "string",
    "password": "string"
}

# Logout
POST /logout

### Events
# Create event (Admin only)
POST /createEvent
{
    "title": "string",
    "description": "string",
    "date": "YYYY-MM-DD",
    "time": "HH:MM",
    "location": "string",
    "organizer": "string",
    "category": "string",
    "image": File
}

# Get all events
GET /events

# Get specific event
GET /event/:id

# Delete event (Admin only)
DELETE /event/:id

### RSVPs
# Create/Update RSVP
POST /event/:id/rsvp
{
    "status": "ATTENDING" | "UNAVAILABLE"
}

# Get event RSVPs
GET /event/:id/rsvps

# Get user's RSVP for event
GET /event/:id/my-rsvp

## Configuration

### Environment Variables
DATABASE_URL - PostgreSQL connection string
PORT - Server port (default: 4000)
NODE_ENV - Environment (development/production)

### Database Schema
The system automatically creates three main tables:

    Users
    Events
    RSVPs


## Security Features

    JWT authentication
    Password hashing (bcrypt)
    Protected routes
    File upload validation
    CORS configuration
    HTTP-only cookies


## Error Handling
The API returns structured error responses:
{
    "error": "Error type",
    "details": "Detailed error message"
}

## Contributing

    Fork the repository
    Create your feature branch (git checkout -b feature/AmazingFeature)
    Commit your changes (git commit -m 'Add some AmazingFeature')
    Push to the branch (git push origin feature/AmazingFeature)
    Open a Pull Request


## License
This project is licensed under the MIT License - see the LICENSE file for details.

## Support
For support, please create an issue in the repository or contact [your-email].

## Acknowledgments

    Express.js
    PostgreSQL
    Node.js community

Campus EventHub is a robust backend API for managing events in an educational institution. It supports secure user authentication, event creation, RSVP management, and image uploads, ensuring seamless interactions between event organizers and students.  

**Tech Stack**:  
- **Backend**: Node.js, Express.js  
- **Database**: MySQL  
- **Security**: JWT Authentication, bcrypt  

---

## **Features**

- **User Authentication**: Secure registration and login using JWT.  
- **Event Management**: Create, retrieve, update, and delete events.  
- **RSVP System**: Users can RSVP to events with status updates.  
- **Image Upload**: Upload images for events securely.  
- **Role-Based Access**: Admins manage events; users view and RSVP.  
- **Secure API**: Password encryption and protected endpoints.
-  
## **Links**

-Link to frontend:https://https://campus-eventhub.onrender.com
-Link to backend:https://campus-eventhub-api.onrender.com
---

## **Installation**

### **Prerequisites**

- Node.js (v14 or higher)  
- MySQL (v8.0 or higher)  
- npm or yarn  

### **Steps**

1. **Clone the Repository**  
   ```bash
   git clone https://github.com/David150-150/Campus_EventHub.git
   cd Campus_EventHub
   ```

2. **Install Dependencies**  
   - Backend:  
     ```bash
     cd server
     npm install
     ```

3. **Database Configuration**  
   - Create a MySQL database named `campus_eventhub`.  
   - Update the `.env` file in the `server` folder:  
     ```plaintext
     PORT=4000
     DB_HOST=localhost
     DB_USER=your_mysql_username
     DB_PASSWORD=your_mysql_password
     DB_NAME=campus_eventhub
     JWT_SECRET=your_secret_key
     ```

4. **Run the Server**  
   - **Development Mode**  
     ```bash
     npm run dev
     ```  
   - **Production Mode**  
     ```bash
     npm start
     ```

---

## **Usage**

### **Default Admin Account**  
- Email: `admin@example.com`  
- Password: `admin123`  

---

## **API Reference**

### **Authentication**

#### **Register a New User**  
- **POST** `/register`  
**Request Body**:  
```json
{
    "name": "Kofi Ankamah",
    "email": "Ankamah@example.com",
    "password": "password123"
}
```

#### **Login**  
- **POST** `/login`  
**Request Body**:  
```json
{
    "email": "Ankamah@example.com",
    "password": "password123"
}
```

#### **Logout**  
- **POST** `/logout`

---

### **Events**

#### **Create Event (Admin Only)**  
- **POST** `/events`  
**Request Body**:  
```json
{
    "title": "Campus Orientation",
    "description": "An introduction to campus life for new students.",
    "date": "2024-06-15",
    "time": "10:00 AM",
    "location": "Main Hall",
    "category": "Orientation",
    "organizer": "Admin"
}
```

#### **Get All Events**  
- **GET** `/events`  

#### **Get Event by ID**  
- **GET** `/events/:id`  

#### **Delete Event (Admin Only)**  
- **DELETE** `/events/:id`  

---

### **RSVPs**

#### **RSVP for an Event**  
- **POST** `/events/:id/rsvp`  
**Request Body**:  
```json
{
    "status": "ATTENDING"
}
```

#### **Get RSVPs for an Event**  
- **GET** `/events/:id/rsvps`  

---

## **Configuration**

### **Environment Variables**  
Update the `.env` file with the following:  
```plaintext
PORT=4000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=campus_eventhub
JWT_SECRET=your_jwt_secret
```

---

## **Security Features**

- **JWT Authentication**: Secure user sessions.  
- **Password Hashing**: User passwords are encrypted using bcrypt.  
- **Role-Based Access**: Protect admin routes from regular users.  
- **Input Validation**: Prevent malicious requests.  

---

## **Error Handling**

All error responses follow this structure:  
```json
{
    "error": "Error type",
    "details": "Detailed error message"
}
```

---

## **Contributing**

Contributions are welcome! Follow these steps to contribute:  
1. Fork the project.  
2. Create a new branch:  
   ```bash
   git checkout -b feature/your-feature-name
   ```
3. Commit your changes:  
   ```bash
   git commit -m "Add a descriptive message"
   ```
4. Push to the branch:  
   ```bash
   git push origin feature/your-feature-name
   ```
5. Open a Pull Request.  

---

## **License**

This project is licensed under the MIT License. See the `LICENSE` file for details.  

---

## **Support**

For support, issues, or feedback, please contact:  
- **Email**: [your-email@example.com](mailto:your-email@example.com)  
- **GitHub**: [David150-150](https://github.com/David150-150)  

---

## **Acknowledgments**

- **Express.js** for the backend framework.  
- **MySQL** for relational database management.  
- **Node.js** for the runtime environment.  

---

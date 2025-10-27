# 🚖 RideShare - Full Stack Ride Hailing Application

A complete ride-hailing platform (like Uber/Pathao) built with React, TypeScript, Node.js, and MongoDB. Features real-time ride tracking, secure payments, and role-based access for riders, drivers, and admins.

## 🚀 Live Deployment
**Frontend:** [https://ride-app-gamma.vercel.app](https://ride-app-gamma.vercel.app)  
**Backend API:** [https://b5-5.vercel.app](https://b5-5.vercel.app)

## 📖 Project Overview
RideShare is a full-stack ride-hailing application similar to Uber, built with modern web technologies. The platform connects riders with drivers, providing real-time ride tracking, secure payments, and a seamless user experience for both parties.

### Key User Roles:
- **Riders**: Book rides, track drivers in real-time, make payments
- **Drivers**: Accept ride requests, navigate to destinations, manage earnings
- **Admin**: Manage users, monitor platform activity, handle disputes

## ✨ Project Features

### 🚗 Ride Management
- **Real-time Ride Requests**: Drivers receive incoming ride requests with 30-second acceptance timer
- **Live Tracking**: Real-time ride tracking for both riders and drivers
- **Ride Status Updates**: Requested → Accepted → Picked Up → Completed
- **Ride History**: Complete history for both riders and drivers
- **Cancellation System**: Both riders and drivers can cancel with reason tracking

### 👤 User Features
- **Dual Role System**: Single platform for both riders and drivers
- **Profile Management**: Update personal information and preferences
- **Secure Authentication**: JWT-based authentication system
- **Rating System**: Rate rides and provide feedback

### 💰 Payment & Pricing
- **Fare Calculation**: Dynamic pricing based on distance
- **Payment Status Tracking**: Pending, Paid, Refunded states
- **Secure Transactions**: Integrated payment processing

### 🎯 Driver Features
- **Incoming Ride Dashboard**: See nearby ride requests
- **Accept/Reject System**: Smart ride acceptance with timeout
- **Earnings Tracking**: Monitor completed rides and earnings
- **Navigation Integration**: Built-in navigation to pickup/dropoff locations

## 🛠 Technology Stack

### Frontend
- **React 18** - Modern React with hooks
- **TypeScript** - Type-safe development
- **Redux Toolkit** - State management
- **RTK Query** - API data fetching and caching
- **React Router** - Client-side routing
- **Tailwind CSS** - Utility-first CSS framework
- **shadcn/ui** - Modern UI component library
- **React Hook Form** - Form handling with validation
- **Zod** - Schema validation

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **TypeScript** - Type safety
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling
- **JWT** - Authentication tokens
- **bcryptjs** - Password hashing
- **CORS** - Cross-origin resource sharing

### Development & Deployment
- **Vite** - Fast build tool and dev server
- **ESLint** - Code linting
- **Prettier** - Code formatting
- **Vercel** - Frontend deployment
- **Vercel** - Backend deployment

## 🚀 Setup Instructions

### Prerequisites
- Node.js 18+ 
- MongoDB (local or cloud)
- Git

### 1. Clone the Repository
```bash
git https://github.com/wproman/ride-app.git
cd ride-app


phrider@gmail.com
pass: phrider

phdriver@gmail.com
pass: phdriver


 "email": "super@gmail.com",  
 "password": "12345678"
 
 
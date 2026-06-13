#  MediQueue – Tutor Booking System

MediQueue is a clean and simple tutor booking web platform. It helps students find available tutors by subject, check real-time schedule slots, and book learning sessions instantly without any timing conflicts.

###  [Live Site Link](https://mediqueue-app.vercel.app) 

---

##  Key Features

 ** Live Slot System:** Booking a tutor automatically decreases their total slot count by 1. Once it hits 0, the system blocks new bookings.
 ** Date Restrictions:** The system checks the session start date and prevents early bookings if the current date hasn't reached it yet.
 ** Instant Search & Filter:** Students can search for tutors by name (case-insensitive) and filter schedules using custom start/end date ranges.
 ** Secure JWT Dashboard:** Handles private routes using client-side JSON Web Tokens (JWT) along with Firebase Google and email login.
 ** Dark & Light Toggle:** A fully working dark/light mode switcher in the navbar that changes the theme layout globally across all devices.

---

## Tech Stack

 ** Frontend:** React.js, Tailwind CSS, React Router DOM, React Hot Toast
 ** Backend:** Node.js, Express.js, JWT (JSON Web Tokens)
 ** Database & Auth:** MongoDB, Firebase Authentication
 
---

##  How to Setup Locally

1. Clone the project:
```bash


git clone [https://github.com/your-username/mediqueue-client.git](https://github.com/your-username/mediqueue-client.git)
cd mediqueue-client
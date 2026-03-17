# Restaurant Website

## Project Description
A full-stack restaurant website that allows users to browse a menu, place orders, authenticate, and manage their profiles. It features a React frontend for the user interface and a Node.js/Express backend that handles API requests, database interactions, authentication, and email notifications.

## Features
- **User Authentication**: Secure sign-up, login, and password management using Passport.js and Bcrypt.
- **Menu Browsing & Ordering**: Users can view the menu, add items to their sessions, and place orders.
- **Admin/Manager Dashboard**: Capabilities to add, update, and manage notes/menu items securely.
- **Email Notifications**: Integration with Nodemailer to email users for verification and send order invoices.
- **File Uploads**: Supports image uploads for menu items using Multer.
- **Role-based Access Control**: Different access levels for standard customers and managers.

## Tech Stack
### Frontend
- **Framework**: React.js (Create React App)
- **Routing**: React Router DOM
- **UI Libraries**: React Modal
- **Build Tool**: React Scripts / Webpack

### Backend
- **Environment**: Node.js
- **Framework**: Express.js
- **Authentication**: Passport.js (Local Strategy), express-session
- **Database**: PostgreSQL (using `pg` driver)
- **Utilities**: Bcrypt (Password Hashing), Multer (File Uploads), Nodemailer (Emails), CORS, Dotenv

## Project Structure
```text
Restaurant-Website/
├── backend/                  # Node.js & Express backend API
│   ├── public/               # Static assets & EJS views
│   ├── img/                  # Uploaded images directory
│   ├── server.js             # Main backend application entry point
│   ├── package.json          # Backend dependencies
│   └── .env                  # Backend environment variables
├── frontend/                 # React frontend application
│   ├── public/               # Public assets (index.html, etc.)
│   ├── src/                  # React components and generic pages
│   └── package.json          # Frontend dependencies
├── menu.txt                  # Menu structure or textual backup data
├── README.md                 # Project documentation
└── .gitignore                # Git ignored files
```

## Installation

### Prerequisites
- Node.js (v14 or higher recommended)
- PostgreSQL (Installed and running)
- Git

### Steps
1. **Clone the repository** (if applicable) or download the source code:
   ```bash
   git clone <repository_url>
   cd Restaurant-Website
   ```

2. **Install Backend Dependencies**:
   ```bash
   cd backend
   npm install
   ```

3. **Install Frontend Dependencies**:
   ```bash
   cd ../frontend
   npm install
   ```

## Environment Variables

Create a `.env` file in the `backend/` directory with the following variables:

```env
BOSS_CLICK="your_session_secret"
PG_USER="postgres"
PG_HOST="localhost"
PG_DB="Restarant"
PG_PD="your_db_password"
PG_PORT="5432" # or whichever port PostgreSQL uses locally
EMAIL_USER="your_email@example.com"
EMAIL_PASS="your_email_app_specific_password"
```
*Note: Ensure you have an App Password generated if you are using Gmail for `EMAIL_PASS`.*

## Database Setup
1. Open pgAdmin or your PostgreSQL CLI.
2. Create a new database matching `PG_DB` (e.g., `Restarant`).
3. Execute necessary SQL scripts/migrations to create the following required tables:
   - `customer`
   - `manger`
   - `customer_ver`
   - `orders`
   - `order_items`
   - `notes`

*(If no SQL file is provided, you will need to create the tables matching the queries found in `backend/server.js`)*.

## Running the Project (Development)

To run the full-stack project locally, you need two terminal windows:

### 1. Run the Backend API
```bash
cd backend
npm start
```
*The backend server typically runs on `http://localhost:5000`.*

### 2. Run the Frontend React App
```bash
cd frontend
npm start
```
*The frontend will automatically start on `http://localhost:3000` (or whatever React-Scripts configures).*

## Build / Production
To build the React application for production deployment:
```bash
cd frontend
npm run build
```
This will generate optimized static files inside `frontend/build/`. You can configure your backend or a web server (like Nginx) to serve these static files.

## API Endpoints (Backend)

The main Express endpoints include:
- `POST /sing-in`: Authenticate user
- `POST /sing-up`: Register new user
- `POST /change-password`: Update authenticated user password
- `POST /forget-password`: Send verification email for lost password
- `POST /senddata`: Submit an order and send an invoice
- `GET /get-orders`: Fetch past orders
- `POST /add-note` / `PUT /update-note`: Manager functionalities to add/edit items
- `POST /logout`: Destroy session

*(For a full list, explore `backend/server.js`)*.

## Deployment Instructions
1. Setup a production database (e.g., AWS RDS, Supabase, Heroku Postgres).
2. Update `.env` variables with production credentials on your server.
3. Build the frontend using `npm run build`.
4. Run the backend using a process manager like PM2: `pm2 start server.js`.
5. Expose the server using Nginx as a reverse proxy, mapping domain to port.

## Contributing
1. Fork the repository
2. Create a new branch: `git checkout -b feature-branch-name`
3. Make your changes and commit: `git commit -m "Add new feature"`
4. Push to the branch: `git push origin feature-branch-name`
5. Submit a pull request.

## License
ISC License Structure (refer to `package.json`).

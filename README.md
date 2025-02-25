# Appointment Scheduler Frontend

A modern React-based appointment scheduling application that allows users to manage and track appointments efficiently.

## Features

- User authentication and authorization
- Create, view, and manage appointments
- Real-time appointment status updates
- Search and filter appointments
- Responsive design with modern UI

## Tech Stack

- **Frontend Framework**: React (v19.0.0)
- **State Management**: Redux Toolkit
- **UI Components**: Headless UI, Heroicons
- **Styling**: TailwindCSS
- **HTTP Client**: Axios
- **Routing**: React Router DOM
- **Authentication**: JWT

## Prerequisites

- Node.js (v14 or higher)
- npm or yarn package manager

## Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm start
   ```

## Project Structure

```
src/
├── components/         # React components
│   └── appointments/   # Appointment-related components
├── services/          # API services
├── store/             # Redux store configuration
│   └── slices/        # Redux slices
└── App.js            # Main application component
```

## Workflow

1. **User Authentication**:
   - Users can sign in using their credentials
   - JWT token is stored for authenticated requests

2. **Appointment Management**:
   - Create new appointments with title, date, time, and description
   - View list of appointments with status indicators
   - Filter appointments by status (confirmed, pending, cancelled)
   - Search appointments by title

3. **State Management**:
   - Redux manages global application state
   - Separate slices for authentication and appointments
   - Async actions for API interactions

## Available Scripts

- `npm start`: Runs the app in development mode
- `npm test`: Launches the test runner
- `npm run build`: Builds the app for production

## Environment Variables

Create a `.env` file in the root directory with the following variables:

```
REACT_APP_API_URL=your_backend_api_url
```

## Contributing

1. Fork the repository
2. Create a new branch
3. Make your changes
4. Submit a pull request

## License

MIT License

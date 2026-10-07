# Accessibility Advent Calendar

An advent calendar with 24 bite-sized web accessibility tips, one behind each door. Visitors open a door to read that day's tip, and each tip can link to a resource for further reading.

The project also has an admin area for managing the calendar days and the users who can administer it, backed by a REST API and a MongoDB database.

## Tech stack

- [Next.js 16](https://nextjs.org) (App Router) with [React]
- [TypeScript]
- [Sass] (SCSS modules) for styling
- [MongoDB](https://www.mongodb.com) with [Mongoose](https://mongoosejs.com)
- [Lucide](https://lucide.dev) for icons and [date-fns](https://date-fns.org) for dates
- [ESLint](https://eslint.org) (including `eslint-plugin-jsx-a11y`) and [Prettier], run on commit with Husky and lint-staged

## Getting started

### Prerequisites

- [Node.js](https://nodejs.org) and npm
- A database user for the project's MongoDB Atlas cluster.

### 1. Clone the repository and install dependencies

In your terminal:

git clone https://github.com/AccessibleForAll/a11y-advent-calendar.git
cd a11y-advent-calendar
npm install

### 2. Add environment variables

Create a `.env.local` file in the project root with this structure, replacing `<username>` and `<password>` with your database credentials:

MONGODB_URI=mongodb+srv://<username>:<password>@a11y-advent-calendar.n119xuf.mongodb.net/

### 3. Start the development server

npm run dev

Open [http://localhost:3000] in your browser.

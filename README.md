# Next.js Blog with GoREST API Integration

A blog application built with Next.js, React Query, and Ant Design, integrated with the GoREST API. This project demonstrates best practices in building a full-featured blog with authentication and CRUD operations.

🌐 **Live Demo**: [https://gorest-blogs-v2.vercel.app](https://gorest-blogs-v2.vercel.app/)

## ✨ Features

- 🔐 Token-based Authentication
- 📝 Full CRUD Operations for Blog Posts
- 🎨 Modern UI with Ant Design
- 🔄 Real-time Data Updates with React Query
- 📱 Responsive Design
- ✅ End-to-End Testing with Cypress

## 🚀 Getting Started

### Prerequisites

- Node.js 16.x or later
- npm or yarn
- GoREST API Token ([Get it here](https://gorest.co.in/))

### Installation

1. Clone the repository:
```bash
git clone https://github.com/AbdSalehh/blogs.git
cd nextjs-blog
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Create a `.env.local` file in the root directory:
```env
NEXT_PUBLIC_API_URL=https://gorest.co.in/public/v1
```

4. Start the development server:
```bash
npm run dev
# or
yarn dev
```

Visit [http://localhost:3000](http://localhost:3000) to see your application.

## 🧪 Running E2E Tests

Our project uses Cypress for end-to-end testing. Follow these steps to run the tests:

1. Create a `cypress.env.json` file in the root directory:
```json
{
  "GOREST_TOKEN": "your_gorest_token_here"
}
```

2. Run Cypress in GUI mode:
```bash
npm run cypress:open
```

### Test Coverage

Our E2E tests cover:
- ✅ Authentication flow
- ✅ Creating new posts
- ✅ Reading post details
- ✅ Updating existing posts
- ✅ Deleting posts
- ✅ Pagination
- ✅ Error handling

## 🛠️ Tech Stack

- **Framework**: Next.js 13
- **State Management**: React Query
- **UI Library**: Ant Design
- **API Integration**: Axios
- **Testing**: Cypress
- **Styling**: Tailwind CSS
- **Type Checking**: TypeScript

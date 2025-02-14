# Next.js Project with Vitest  

This is a Next.js project that includes CRUD functionality for posts and uses Vitest for unit testing.  

## Table of Contents  
- [Features](#features)  
- [Technologies](#technologies)  
- [Setup](#setup)  
- [Running the Project](#running-the-project)  
- [Running Tests](#running-tests)  
- [Project Structure](#project-structure)  
- [Contributing](#contributing)  
- [License](#license)  

## Features  
- **CRUD Operations**: Create, Read, Update, and Delete posts.  
- **Unit Testing**: Comprehensive unit tests for all CRUD functions using Vitest.  
- **API Integration**: Integration with a mock API ([JSONPlaceholder](https://jsonplaceholder.typicode.com)) for fetching and managing posts.  

## Technologies  
- **[Next.js](https://nextjs.org/)** - React framework for server-side rendering and static site generation.  
- **[Vitest](https://vitest.dev/)** - A Vite-native unit test framework.  
- **[Axios](https://axios-http.com/)** - Promise-based HTTP client for making API requests.  
- **[TypeScript](https://www.typescriptlang.org/)** - Strongly typed JavaScript.  
- **[Tailwind CSS](https://tailwindcss.com/)** - Utility-first CSS framework for styling.
- **[story book](https://storybook.js.org/)** - to build and test UI components in isolation.  

## Setup  

### Clone the repository  
```bash
git clone https://github.com/Ahmedhassanin12/your-parts-task.git
cd your-parts-task
``` 
### Install deps
```bash
npm install
```
### run the prooject
```bash
npm run dev
```
### run tests
```bash
npm run test
```



### Running Storybook
To start Storybook locally, run: 
```bash
npm run storybook
```

### Project Structure
Here’s an overview of the project structure:
```bash
next.js-project/
├── .storybook/            # Storybook configuration
├── .vscode/               # VSCode settings
├── node_modules/          # Node.js dependencies
├── public/                # Static assets
├── src/                   # Source code
│   ├── app/               # Next.js app router (if using App Router)
│   ├── axios_instance/    # Axios instance configuration
│   ├── common/            # Common utilities and components
│   ├── i18n/              # Internationalization files
│   ├── lib/               # Library functions
│   ├── locales/           # Localization files
│   ├── modules/           # Feature modules (e.g., posts)
│   ├── providers/         # Context providers
│   └── middleware.ts      # Next.js middleware
├── .gitignore             # Files and directories to ignore in Git
├── eslint.config.mjs      # ESLint configuration
├── next-env.d.ts          # Next.js TypeScript declarations
├── next.config.ts         # Next.js configuration
├── package-lock.json      # Lockfile for dependencies
├── package.json           # Project dependencies and scripts
├── postcss.config.mjs     # PostCSS configuration
├── README.md              # Project documentation
├── tailwind.config.ts     # Tailwind CSS configuration
└── tsconfig.json          # TypeScript configuration
```






# React SSR sub site for jenniina.fi

This is a server-side rendered sub site for jenniina.fi that is built with React and Vike (formerly Vite-plugin-ssr). The application features both server-side rendering (SSR) and static site generation (SSG) capabilities, providing excellent performance and SEO optimization while maintaining the interactive React portfolio of Jenniina Laine.

## Architecture

This application uses a modern SSR (Server-Side Rendering) architecture built with:

- **Vike (v0.4.245)** - Modern SSR/SSG framework for Vite, providing server-side rendering and static site generation
- **Vite (v6.0.0)** - Fast build tool and development server with HMR (Hot Module Replacement)
- **React 18.3.1** - Frontend framework with modern features like concurrent rendering and automatic batching
- **TypeScript** - Type safety and enhanced developer experience
- **Node.js** - Server runtime for SSR and API endpoints

### SSR Features

- **Pre-rendering**: Static HTML generation for better SEO and faster initial page loads
- **Client-side hydration**: Seamless transition from server-rendered HTML to interactive React components
- **Client-side routing**: Fast navigation between pages without full page reloads
- **SSR-safe components**: All components are designed to work both on server and client
- **Optimized builds**: Automatic code splitting and optimization for production

## Content

The site is divided into three main sections: About, Portfolio and Contact. The About section contains a short introduction of the site. The Portfolio section contains a list of projects that Jenniina has worked on. The Contact section contains a contact form that can be used to send a message to Jenniina.

### Portfolio

#### Accessible Colors App

The accessible colors app is a tool that can be used to check the contrast ratio between two colors. The app uses the WCAG 2.0 guidelines to determine if the contrast ratio between two colors is sufficient for people with visual impairments. The app has a user interface that allows the user to generate color palettes (analogous, complementary, triadic, tetradic and monochromatic) and visually see whether the colors have sufficient contrast thanks to the icons that indicate the contrast ratio. The app also has a color picker that allows the user to select colors. The resulting color palettes may be saved in SVG or PNG format.

#### Memory Card Game

The memory card game has a user interface that allows the user to select the number of cards to play with and the type of card to use (icons, numbers or letters). The game also has a timer that counts up the time it takes to complete the game. The high scores are saved to a MongoDB database. The game stores the high scores for each difficulty level and displays the top 5 scores for each level and card type.

#### Quiz App

The quiz app is a simple quiz application that was built with React. The app uses the Open Trivia Database API to fetch questions and answers. The app has a simple user interface that allows the user to select a category and difficulty level for the quiz. The app also has a timer that counts down the time left to answer the questions.

#### Jokes App

The jokes app named "The Comedian's Companion" is a jokes application that uses the JokeAPI, Chuck Norris API and Dad joke API to fetch jokes. Additionally, a logged in user can add their own jokes to the app. Saved jokes are stored to a MongoDB database.

The app has a user interface that allows the user to select a category for the jokes, choose from seven languages, search by keyword and filter the results by safe/unsafe and joke type (single/two-part).

#### Blob art app

An art app where you can drag around blobs and change their color, size and amount. The blobs blur into each other and have a subtle swaying animation, which can be switched off. The app uses createContext and useReducer to manage the state of the blobs.

#### Drag and Drop

My useDragAndDrop hook takes two parameters: an array of draggable items with id and status, and an array of statuses that amount to the different areas where the items can be dropped. The hook returns an array of draggable items with their status updated, and a function to update the status of the items. The hook is used in the Drag and Drop app to manage the state of the draggable items. The app can also be used with a keyboard.

#### To Do App

A to do app that uses reduxjs/toolkit for state management. The app has a user interface that allows the user to add,l edit and delete to do items. The app has a button to clear all completed items. Logged in users have their todos saved to a MongoDB database. Tasks can be reordered by dragging and dropping.

#### Custom Select

A custom select component (single and multi) that uses React's useRef and useState hooks to manage the state of the select component. The component has a user interface that allows the user to select an option from a list of options. The component also has a button that allows the user to clear the selected option.

#### Multi Step Form

A multi step form that uses React's useState hook to manage the state of the form.

## Development

### Tech Stack

The site is built with React and server-side rendering capabilities using the following technologies:

#### Core Framework

- **Vike (v0.4.245)**: SSR/SSG framework providing server-side rendering and static site generation
- **Vite (v6.0.0)**: Fast build tool with HMR and optimized production builds
- **React (v18.3.1)**: Frontend framework with concurrent features
- **TypeScript (v4.6.4)**: Static type checking and enhanced developer experience

#### State Management & Data

- **@reduxjs/toolkit**: Modern Redux for predictable state management
- **react-redux**: Official React bindings for Redux
- **axios**: HTTP client for API requests with server-side compatibility

#### Routing & Navigation

- **react-router-dom**: Client-side routing with SSR support
- **Vike routing**: File-based routing system with pre-rendering capabilities

#### UI & Styling

- **react-icons**: Comprehensive icon library
- **CSS Modules**: Scoped styling with TypeScript support

#### Utilities

- **uuid**: Unique identifier generation
- **dom-to-image-more**: Client-side image generation from DOM elements

#### Development Tools

- **ESLint**: Code linting with React and TypeScript rules
- **Prettier**: Code formatting with custom configuration
- **Cross-env**: Cross-platform environment variable support

### Development Scripts

```bash
# Development
npm run dev          # Start development server with HMR
npm run preview      # Preview production build locally

# Building
npm run build        # Production build with SSR and pre-rendering
npm run build:debug  # Debug build with additional logging
npm run build:prod   # Production build with optimizations

# Code Quality
npm run lint         # Run ESLint
npm run lint:fix     # Fix ESLint issues automatically
npm run format       # Format code with Prettier
npm run format:check # Check code formatting
npm run format:lint  # Format and lint in sequence
npm run type-check   # TypeScript type checking
```

### SSR Configuration

The application is configured for server-side rendering with:

- Pre-rendering enabled for all pages for static site generation
- Client-side hydration for interactive components
- SSR-safe localStorage and window object handling
- Optimized bundle splitting for client and server builds

### Project Structure

```
src/
├── pages/           # Page components and Vike configuration
│   ├── +config.ts   # Vike SSR configuration
│   ├── +*.tsx       # Page layouts and rendering logic
│   └── pages-portfolio/  # Portfolio subpages
├── components/      # Reusable React components
├── hooks/          # Custom React hooks (SSR-compatible)
├── contexts/       # React context providers
├── reducers/       # Redux reducers and slices
├── services/       # API services and utilities
├── types/          # TypeScript type definitions
└── utils/          # Utility functions
```

# React sub site for jenniina.fi

This is a sub site for jenniina.fi that is built with React. It is a single page application that is used to display the React portfolio of Jenniina Laine.

## Content

The site is divided into three main sections: About, Portfolio and Contact. The About section contains a short introduction of the site. The Portfolio section contains a list of projects that Jenniina has worked on. The Contact section contains a contact form that can be used to send a message to Jenniina.

### Portfolio

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

The site is built with React and uses the following libraries:

    - @reduxjs/toolkit: Redux toolkit is used for state management.
    - axios: Axios is used for making HTTP requests.
    - react-icons: React icons is used for displaying icons.
    - react-redux: React redux is used for state management.
    - react-router-dom: React router dom is used for routing.
    - uuid: UUID is used for generating unique ids.

The site is built with Vite and uses TypeScript for type checking.

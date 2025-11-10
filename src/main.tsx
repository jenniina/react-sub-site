// import { StrictMode } from "react";
// import ReactDOM from "react-dom/client";
// import { Provider } from "react-redux";
// import store from "./store";
// import App from "./App";
// import "./css/index.css";
// import { BrowserRouter } from "react-router-dom";
// import { ThemeProvider } from "./contexts/ThemeContext";
// import { ModalProvider } from "./hooks/useModal";
// import { LanguageProvider } from "./contexts/LanguageContext";
// import { BlobProvider } from "./components/Blob/components/BlobProvider";

// function AppWrapper() {
//   return (
//     <StrictMode>
//       <BrowserRouter>
//         <LanguageProvider>
//           <BlobProvider>
//             <ThemeProvider>
//               <Provider store={store}>
//                 <ModalProvider>
//                   <App />
//                 </ModalProvider>
//               </Provider>
//             </ThemeProvider>
//           </BlobProvider>
//         </LanguageProvider>
//       </BrowserRouter>
//     </StrictMode>
//   );
// }

// if (typeof document !== "undefined") {
//   ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
//     <AppWrapper />
//   );
// }

// // Export for SSG
// export function createRoot(ssr: boolean) {
//   const routes = [
//     "/",
//     "/about",
//     "/edit",
//     "/portfolio",
//     "/portfolio/graphql",
//     "/portfolio/blob",
//     "/portfolio/draganddrop",
//     "/portfolio/todo",
//     "/portfolio/select",
//     "/portfolio/form",
//     "/portfolio/jokes",
//     "/portfolio/quiz",
//     "/portfolio/quiz/difficulty/easy",
//     "/portfolio/quiz/difficulty/medium",
//     "/portfolio/quiz/difficulty/hard",
//     "/portfolio/quiz/results",
//     "/portfolio/salon",
//     "/portfolio/composer",
//     "/portfolio/colors",
//     "/portfolio/memory",
//     "/portfolio/media",
//     "/contact",
//     "/cart",
//     "/store",
//     "/orders",
//     "/disclaimer",
//     "/terms",
//   ];

//   return {
//     routes,
//     App: AppWrapper,
//   };
// }

// export default AppWrapper;
import React from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import store from './store'
import App from './App'
import './css/index.css'
import { BrowserRouter } from 'react-router-dom'
import { ThemeProvider } from './contexts/ThemeContext'
import { ModalProvider } from './hooks/useModal'
import { LanguageProvider } from './contexts/LanguageContext'
import { BlobProvider } from './components/Blob/components/BlobProvider'

const container = document.getElementById('root')
if (!container) throw new Error('Root element not found')

const root = createRoot(container)
root.render(
  <React.StrictMode>
    <BrowserRouter
      future={{
        v7_startTransition: true,
        v7_relativeSplatPath: true,
      }}
    >
      <LanguageProvider>
        <BlobProvider>
          <ThemeProvider>
            <Provider store={store}>
              <ModalProvider>
                <App />
              </ModalProvider>
            </Provider>
          </ThemeProvider>
        </BlobProvider>
      </LanguageProvider>
    </BrowserRouter>
  </React.StrictMode>
)

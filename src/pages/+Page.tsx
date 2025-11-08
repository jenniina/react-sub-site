import App from "../App";
import React, { StrictMode } from "react";
import { Provider } from "react-redux";
import store from "../store";
import "../css/index.css";
import { BrowserRouter } from "react-router-dom";
import { StaticRouter } from "react-router-dom/server";
import { ThemeProvider } from "../contexts/ThemeContext";
import { ModalProvider } from "../hooks/useModal";
import { LanguageProvider } from "../contexts/LanguageContext";
import { BlobProvider } from "../components/Blob/components/BlobProvider";

export default function Page({ pageContext }: any) {
  // Use StaticRouter for SSR, BrowserRouter for client
  const Router: React.ElementType =
    typeof window !== "undefined" ? BrowserRouter : StaticRouter;
  const routerProps =
    typeof window !== "undefined" ? {} : { location: pageContext.urlPathname };

  return (
    <StrictMode>
      <Router {...routerProps}>
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
      </Router>
    </StrictMode>
  );
}

// import React from "react";
// import App from "../App";
// import { LanguageProvider } from "../contexts/LanguageContext";
// import { StaticRouter } from "react-router-dom/server";
// import { BrowserRouter } from "react-router-dom";

// console.log("App component:", App);
// console.log("LanguageProvider:", LanguageProvider);

// export default function Page({ pageContext }: { pageContext?: any }) {
//   // Use StaticRouter for SSR, BrowserRouter for client
//   const Router: React.ElementType =
//     typeof window !== "undefined" ? BrowserRouter : StaticRouter;
//   const routerProps =
//     typeof window !== "undefined"
//       ? {}
//       : { location: pageContext?.urlPathname || "/" };

//   if (!App) {
//     return React.createElement(
//       "div",
//       null,
//       "ERROR: App component is undefined!"
//     );
//   }

//   if (!LanguageProvider) {
//     return React.createElement(
//       "div",
//       null,
//       "ERROR: LanguageProvider is undefined!"
//     );
//   }

//   return React.createElement(
//     Router,
//     routerProps,
//     React.createElement(
//       LanguageProvider,
//       null,
//       React.createElement(
//         "div",
//         null,
//         React.createElement(
//           "h1",
//           null,
//           "Testing App with Router and LanguageProvider"
//         ),
//         React.createElement(App)
//       )
//     )
//   );
// }

import React from "react";
import { Provider } from "react-redux";
import store from "../store";
import { ThemeProvider } from "../contexts/ThemeContext";
import { ModalProvider } from "../hooks/useModal";
import { LanguageProvider } from "../contexts/LanguageContext";
import { BlobProvider } from "../components/Blob/components/BlobProvider";
import * as HelmetAsync from "react-helmet-async";
import "../css/index.css";

const { HelmetProvider } = HelmetAsync;

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <HelmetProvider>
      <LanguageProvider>
        <BlobProvider>
          <ThemeProvider>
            <Provider store={store}>
              <ModalProvider>{children}</ModalProvider>
            </Provider>
          </ThemeProvider>
        </BlobProvider>
      </LanguageProvider>
    </HelmetProvider>
  );
}

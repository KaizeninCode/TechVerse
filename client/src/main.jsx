import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { ChakraProvider } from "@chakra-ui/react";
import { BrowserRouter as Router } from "react-router-dom";
import ThemeProvider from "./components/ThemeContext.jsx";
import { Provider } from "react-redux";
import { store } from "./store/store.jsx";
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <ThemeProvider>
        <ChakraProvider>
          <Router>
            <App />
          </Router>
        </ChakraProvider>
      </ThemeProvider>
    </Provider>
  </React.StrictMode>
);

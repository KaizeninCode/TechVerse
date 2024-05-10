import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { ChakraProvider } from "@chakra-ui/react";
<<<<<<< HEAD
import {BrowserRouter as Router} from 'react-router-dom'
import { ChakraProvider } from '@chakra-ui/react'

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Router>
      <ChakraProvider>
        <ChakraProvider>
      <App />
      </ChakraProvider>
    </Router>
    </ChakraProvider>
  </React.StrictMode>
);
=======
import { ChakraProvider } from "@chakra-ui/react";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ChakraProvider>
      <App />
    </ChakraProvider>
  </React.StrictMode>
);
>>>>>>> a4dedba ({Fet}:Implemented form validation using formik & yup)

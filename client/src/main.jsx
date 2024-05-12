import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { ChakraProvider } from '@chakra-ui/react'
import { BrowserRouter as Router } from'react-router-dom'
import ThemeProvider from './components/ThemeContext.jsx'
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
 <ThemeProvider>
   <ChakraProvider>
  
  <Router>
     <App />
  </Router>
  
  </ChakraProvider>
 </ThemeProvider>
 
    
  </React.StrictMode>
)

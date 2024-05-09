import Explore from "./pages/Explore"
import Home from "./pages/Home"
import {Routes, Route} from 'react-router-dom'
import UserAuth from "./components/UserAuth"

const App = () => {

  return (
    <main>
      <Routes>
       <Route path='/' element={<Home/>}/> 
       <Route path='/explore' element={<Explore/>}/> 
       <UserAuth/>
      </Routes>
    </main>
    
  )
}

export default App

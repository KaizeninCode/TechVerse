import Explore from "./pages/Explore"
import Home from "./pages/Home"
import {Routes, Route} from 'react-router-dom'
import UserAuth from "./components/UserAuth"

const App = () => {

  return (
    <main className="bg-gray-100" id="main">
      <Routes>
       <Route path='/' element={<Home/>}/> 
       <Route path='/explore' element={<Explore/>}/> 
      </Routes>
       {/* <UserAuth/> */}
    </main>
    
  )
}

export default App

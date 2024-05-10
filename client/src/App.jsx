import Explore from "./pages/Explore"
import Home from "./pages/Home"
import {Routes, Route} from 'react-router-dom'

const App = () => {

  return (
    <main className="bg-gray-100" id="main">
      <Routes>
       <Route path='/' element={<Home/>}/> 
       <Route path='/explore' element={<Explore/>}/> 
      </Routes>
    </main>
  )
}

export default App

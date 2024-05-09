import Explore from "./pages/Explore"
import Home from "./pages/Home"
import {Routes, Route} from 'react-router-dom'

const App = () => {

  return (
    <main>
      <Routes>
       <Route path='/' element={<Home/>}/> 
       <Route path='/explore' element={<Explore/>}/> 
      </Routes>
    </main>
  )
}

export default App

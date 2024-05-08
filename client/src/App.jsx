import {Routes,Route } from 'react-router-dom'
import Post from './pages/Post'
const App = () => {

  return (
    <>
      <Routes>
        <Route path='/post' element={<Post/>}/>
      </Routes>
    </>
  )
}

export default App

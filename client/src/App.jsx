import {Routes,Route } from 'react-router-dom'
import Post from './pages/Post'
import Profile from './pages/profile/Profile'
const App = () => {

  return (
    <>
      <Post/>
      <Routes>
        <Route path='/profile' element={<Profile/>} />
      </Routes>
    </>
  )
}

export default App

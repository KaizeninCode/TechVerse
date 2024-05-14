import Header from "../components/Header"
import Navbar from "../components/Navbar"
import PostContainer from "../components/PostContainer"
import RightNav from "../components/RightNav"
import SearchBar from "../components/SearchBar"


const Explore = () => {
  return (
    <section className='section'>
      <div className="w-full h-screen flex max-lg:flex-col justify-between overflow-y-scroll">
          <Navbar/>
          <Header/>
          <PostContainer/>
         
        </div>
    </section>
  )
}

export default Explore

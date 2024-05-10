import Header from "../components/Header"
import Navbar from "../components/Navbar"
import PostContainer from "../components/PostContainer"
import RightNav from "../components/RightNav"


const Explore = () => {
  return (
    <section className='section'>
      <div className="w-full h-screen flex justify-between overflow-y-scroll">
          
          <Header/>
          <PostContainer/>
         
        </div>
    </section>
  )
}

export default Explore

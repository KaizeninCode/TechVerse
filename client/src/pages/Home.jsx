import Header from "../components/Header"
import MobilePostContainer from "../components/MobilePostContainer"
import Navbar from "../components/Navbar"
import PostContainer from "../components/PostContainer"
import RightNav from "../components/RightNav"

const Home = () => {
  return (
    <section className='section'>
        <div className="w-full h-screen flex max-lg:flex-col justify-between overflow-y-scroll">
          <Navbar/>
          <Header/>
          <PostContainer/>
          {/* <MobilePostContainer/> */}
          <RightNav/> 
        </div>
    </section>
  )
}

export default Home

import Header from "../components/Header"
import Navbar from "../components/Navbar"
import PostContainer from "../components/PostContainer"
import RightNav from "../components/RightNav"


const Home = () => {
  return (
    <section className='section'>
        <div className=" h-screen flex">
          
          <Header/>
          <PostContainer/>
          
        </div>
    </section>
  )
}

export default Home

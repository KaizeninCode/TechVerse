import Header from "../components/Header"
import Navbar from "../components/Navbar"
import PostContainer from "../components/PostContainer"
import RightNav from "../components/RightNav"


const Home = ({theme}) => {
  
  return (
    <section className='section'>
        <div className=" h-screen flex">
          
          <Header theme={theme}/>
          <PostContainer theme={theme}/>
          
        </div>
    </section>
  )
}

export default Home

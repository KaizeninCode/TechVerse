import Header from "../components/Header"
import Navbar from "../components/Navbar"
import PostContainer from "../components/PostContainer"
import RightNav from "../components/RightNav"


const Home = ({theme}) => {
  
  return (
    <section className='section'>
        <div className="w-full h-screen flex max-lg:flex-col justify-between overflow-y-scroll">
          <Navbar/>
          <Header theme={theme}/>
          <PostContainer theme={theme}/>
          <RightNav/> 
          
        </div>
    </section>
  )
}

export default Home

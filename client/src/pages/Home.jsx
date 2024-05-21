import Header from "../components/Header"
import Navbar from "../components/Navbar"
import PostContainer from "../components/PostContainer"
import Category from "../components/RightNav"
import RightNav from "../components/RightNav"


const Home = ({theme}) => {
  
  return (
    <section className='section'>
      <div className="w-full h-screen flex max-lg:flex-col justify-between overflow-y-scroll">
         <Navbar/> 
        <Header/>
        <PostContainer theme={theme}/>
     
        
      </div>
    </section>
  )
}

export default Home

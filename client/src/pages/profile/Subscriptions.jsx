import {useEffect,useState} from 'react'

// import PostContainer from '../../components/PostContainer'
// import ProfileNav from './ProfileNav'
import UserPosts from './userPosts'
import Navbar from '../../components/Navbar'
import RightNav from '../../components/RightNav'


function Subscriptions() {
const[fetchedData,setFetchedData] = useState(null)
const[loading,setLoading]=useState(false)

  useEffect(() => {
    const fetchSubscription = async () => {
      setLoading(true);
      try {
        const response = await fetch("http://127.0.0.1:5555/subscriptions");
        if (!response.ok)
          throw new Error(`HTTP error! status ${response.status}`);
        const data = await response.json();
        setFetchedData(data);
      } catch (err) {
        console.error(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchSubscription(); 
  }, []);
  return (
    <section className="section">
      <div className="w-full h-screen flex max-lg:flex-col justify-between overflow-y-scroll">
        <Navbar />
        {/* {fetchedData.length ===0?(<h1>No subscriptions</h1>):(fetchedData.map(data=>data))} */}
     <h1>No subscriptions available</h1>
        <RightNav />
      </div>
    </section>
  );
}

export default Subscriptions

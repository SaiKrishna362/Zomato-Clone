import Navbar from '../NavbarRoute'
import Carousel from '../CarouselRoute'
import Footer from '../Footer'
import PopularRestaurants from '../PopularRestaurants'
import './index.css'

const Home = () => (
  <>
    <Navbar />
    <div className="home-container">
      <Carousel />
      <PopularRestaurants />
    </div>
    <Footer />
  </>
)

export default Home

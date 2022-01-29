import {Link} from 'react-router-dom'
import Navbar from '../NavbarRoute'

import './index.css'

const NotFound = () => (
  <>
    <Navbar />
    <div className="not-found-container">
      <img
        src="https://res.cloudinary.com/dkobk5oao/image/upload/v1633714179/erroring_1_arx7dt.png"
        alt="not found"
        className="not-found-image"
      />
      <h1 className="not-found-heading">Page Not Found</h1>
      <p className="not-found-text">
        we are sorry, the page you requested could not be found <br /> Please go
        back to the homepage
      </p>
      <Link to="/">
        <button type="button" className="home-btn">
          Home Page
        </button>
      </Link>
    </div>
  </>
)

export default NotFound

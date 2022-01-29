import {Component} from 'react'
import Cookies from 'js-cookie'
import Slider from 'react-slick'
import Loader from 'react-loader-spinner'
import './index.css'

class Carousel extends Component {
  state = {offersList: [], isLoading: true}

  componentDidMount() {
    this.getCarouselList()
  }

  getCarouselList = async () => {
    this.setState({isLoading: true})
    const apiUrl = 'https://apis.ccbp.in/restaurants-list/offers'
    const jwtToken = Cookies.get('jwt_token')

    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(apiUrl, options)

    const data = await response.json()
    const updatedData = data.offers.map(eachItem => ({
      id: eachItem.id,
      imageUrl: eachItem.image_url,
    }))
    this.setState({offersList: updatedData, isLoading: false})
  }

  renderLoader = () => (
    <div
      testid="restaurants-offers-loader"
      className="restaurants-offers-loader"
    >
      <Loader type="ThreeDots" color="#F7931E" height={50} width={50} />
    </div>
  )

  renderCarousel = () => {
    const {offersList} = this.state

    const settings = {
      dots: true,
      infinite: true,
      speed: 1000,
      slidesToShow: 1,
      slidesToScroll: 1,
      autoplay: true,
      autoplaySpeed: 5000,
    }
    return (
      <ul className="carousel-container">
        <Slider {...settings} className="carousal">
          {offersList.map(eachImage => (
            <li key={eachImage.id}>
              <img
                src={eachImage.imageUrl}
                alt="offer"
                className="carousal-item-image"
              />
            </li>
          ))}
        </Slider>
      </ul>
    )
  }

  render() {
    const {isLoading} = this.state
    return isLoading ? this.renderLoader() : this.renderCarousel()
  }
}

export default Carousel

import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'
import {FaStar, FaRupeeSign} from 'react-icons/fa'
import Navbar from '../NavbarRoute'
import Footer from '../Footer'
import FoodItem from '../FoodItemRoute'
import './index.css'

class RestaurantDetails extends Component {
  state = {
    restaurantData: {},
    foodItemsList: [],
    isLoading: false,
  }

  componentDidMount() {
    this.getRestaurantDetails()
  }

  getRestaurantDetails = async () => {
    this.setState({isLoading: true})
    const jwtToken = Cookies.get('jwt_token')
    const {match} = this.props
    const {params} = match
    const {id} = params

    const apiUrl = `https://apis.ccbp.in/restaurants-list/${id}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(apiUrl, options)
    const data = await response.json()
    const restaurantData = {
      costForTwo: data.cost_for_two,
      cuisine: data.cuisine,
      foodItems: data.food_items,
      id: data.id,
      imageUrl: data.image_url,
      itemsCount: data.items_count,
      location: data.location,
      name: data.name,
      opensAt: data.opens_at,
      rating: data.rating,
      reviewsCount: data.reviews_count,
    }
    const foodItems = data.food_items.map(eachFoodItem => ({
      cost: eachFoodItem.cost,
      foodType: eachFoodItem.food_type,
      id: eachFoodItem.id,
      imageUrl: eachFoodItem.image_url,
      name: eachFoodItem.name,
      rating: eachFoodItem.rating,
    }))
    this.setState({
      restaurantData,
      foodItemsList: foodItems,
      isLoading: false,
    })
  }

  renderLoader = () => (
    <div testid="restaurant-details-loader" className="restaurant-loader">
      <Loader type="ThreeDots" color="#F7931E" height={50} width={50} />
    </div>
  )

  renderRestaurantDetails = () => {
    const {restaurantData, foodItemsList} = this.state

    const {
      name,
      imageUrl,
      cuisine,
      location,
      rating,
      costForTwo,
      reviewsCount,
    } = restaurantData

    return (
      <>
        <div className="banner-bg">
          <div className="banner-container">
            <img src={imageUrl} alt="restaurant" className="res-image" />
            <div className="res-info">
              <h1 className="res-name">{name}</h1>
              <p className="res-cuisine">{cuisine}</p>
              <p className="res-location">{location}</p>
              <div className="rating-rate-container">
                <div className="rating-container">
                  <p className="rating">
                    <FaStar />
                    {rating}
                  </p>
                  <p className="sub-text">{reviewsCount}+ Ratings</p>
                </div>
                <hr className="separation-line" />
                <div className="rating-container">
                  <p className="rating">
                    <FaRupeeSign />
                    {costForTwo}
                  </p>
                  <p className="sub-cost-para">Cost for two</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <ul className="food-items-list">
          {foodItemsList.map(eachItem => (
            <FoodItem foodItem={eachItem} key={eachItem.id} />
          ))}
        </ul>
      </>
    )
  }

  render() {
    const {isLoading} = this.state
    return (
      <>
        <Navbar />
        {isLoading ? this.renderLoader() : this.renderRestaurantDetails()}
        <Footer />
      </>
    )
  }
}
export default RestaurantDetails

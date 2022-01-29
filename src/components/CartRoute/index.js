import {Component} from 'react'
import {Link} from 'react-router-dom'
import CartContext from '../../context/cartContext'
import Payment from '../Payment Route'
import Navbar from '../NavbarRoute'
import Footer from '../Footer'
import CartItem from '../CartItem'
import CartTotal from '../CartTotalRoute'
import './index.css'

class Cart extends Component {
  state = {showPayment: false}

  orderPlaced = () => {
    this.setState(prevState => ({showPayment: !prevState.showPayment}))
  }

  render() {
    const upParsedCartList = localStorage.getItem('cartData')
    const parsedCartList = JSON.parse(upParsedCartList)
    return (
      <CartContext.Consumer>
        {value => {
          const {cartList} = value

          const {showPayment} = this.state

          return (
            <>
              <Navbar />
              <div className="cart-container">
                {cartList.length === 0 ? (
                  <div className="empty-cart-container">
                    <img
                      src="https://res.cloudinary.com/dkobk5oao/image/upload/v1633691028/cooking_1_qled9u.png"
                      alt="empty cart"
                      className="empty-cart-image"
                    />
                    <h1 className="no-order-heading">No Order Yet!</h1>
                    <p className="no-order-para">
                      Your cart is empty. Add something from the menu.
                    </p>
                    <Link to="/">
                      <button type="button" className="order-btn">
                        Order Now
                      </button>
                    </Link>
                  </div>
                ) : (
                  <>
                    {showPayment ? (
                      <Payment />
                    ) : (
                      <div className="cart-content-container">
                        <div className="cart-headers-cont">
                          <p className="cart-header-items">Item</p>
                          <div className="qty-price-cont">
                            <p className="cart-header-quantity">Quantity</p>
                            <p className="cart-header-price">Price</p>
                          </div>
                        </div>
                        <ul className="cart-list">
                          {parsedCartList.map(eachItem => (
                            <CartItem
                              key={eachItem.id}
                              cartItem={eachItem}
                              value={value}
                            />
                          ))}
                        </ul>
                        <CartTotal orderPlaced={this.orderPlaced} />
                      </div>
                    )}
                  </>
                )}
              </div>
              <Footer />
            </>
          )
        }}
      </CartContext.Consumer>
    )
  }
}
export default Cart

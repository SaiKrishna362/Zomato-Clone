import {BsPlusSquare, BsDashSquare} from 'react-icons/bs'
import {FaRupeeSign} from 'react-icons/fa'
import CartContext from '../../context/cartContext'

import './index.css'

const CartItem = props => (
  <CartContext.Consumer>
    {value => {
      const {incrementCartItemQuantity, decrementCartItemQuantity} = value
      const {cartItem} = props
      const {id, name, quantity, cost, imageUrl} = cartItem

      const decreaseQuantity = () => {
        decrementCartItemQuantity(id)
      }

      const increaseQuantity = () => {
        incrementCartItemQuantity(id)
      }

      return (
        <li testid="cartItem" className="cart-item">
          <div className="cart-item-info">
            <img src={imageUrl} alt={name} className="cart-item-image" />
            <h1 className="cart-item-desktop-name">{name}</h1>
          </div>

          <div className="response-quantity">
            <p className="cart-item-mobile-name">{name}</p>
            <div className="cart-quantity-container">
              <button
                testid="decrement-quantity"
                className="decrement-quantity"
                type="button"
                onClick={decreaseQuantity}
              >
                <BsDashSquare size={16} />
              </button>
              <p testid="item-quantity" className="item-quantity">
                {quantity}
              </p>
              <button
                testid="increment-quantity"
                className="increment-quantity"
                type="button"
                onClick={increaseQuantity}
              >
                <BsPlusSquare size={16} />
              </button>
            </div>
            <p className="price">
              <FaRupeeSign size={12} /> {cost * quantity}
            </p>
          </div>
        </li>
      )
    }}
  </CartContext.Consumer>
)

export default CartItem

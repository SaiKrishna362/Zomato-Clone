import {Component} from 'react'
import {Switch, Route} from 'react-router-dom'
import './App.css'
import Login from './components/LoginRoute'
import Home from './components/HomeRoute'
import ProtectedRoute from './components/ProtectedRoute'
import Cart from './components/CartRoute'
import RestaurantDetails from './components/RestaurantDetails'
import CartContext from './context/cartContext'
import NotFound from './components/NotFoundRoute'

const getCartList = () => {
  const gotData = localStorage.getItem('cartData')
  const upGotList = JSON.parse(gotData)

  if (upGotList === null) {
    return []
  }
  return upGotList
}

class App extends Component {
  state = {cartList: getCartList()}

  removeAllCartItems = () => {
    this.setState({cartList: []})
  }

  addCartItem = product => {
    const {cartList} = this.state
    const obj = cartList.find(eachList => eachList.id === product.id)

    if (obj) {
      this.setState(prevState => ({
        cartList: prevState.cartList.map(eachList => {
          if (eachList.id === product.id) {
            const upQuantity = eachList.quantity
            return {...eachList, quantity: upQuantity}
          }
          return eachList
        }),
      }))
    } else {
      this.setState({cartList: [...cartList, product]})
    }
  }

  incrementCartItemQuantity = id => {
    this.setState(prevState => ({
      cartList: prevState.cartList.map(eachList => {
        if (eachList.id === id) {
          const upQuantity = eachList.quantity + 1
          return {...eachList, quantity: upQuantity}
        }
        return eachList
      }),
    }))
  }

  decrementCartItemQuantity = id => {
    const {cartList} = this.state
    const obj = cartList.find(eachList => eachList.id === id)

    if (obj.quantity > 1) {
      this.setState(prevState => ({
        cartList: prevState.cartList.map(eachList => {
          if (eachList.id === id) {
            const upQuantity = eachList.quantity - 1
            return {...eachList, quantity: upQuantity}
          }
          return eachList
        }),
      }))
    } else {
      this.removeCartItem(id)
    }
  }

  removeCartItem = id => {
    this.setState(prevState => ({
      cartList: prevState.cartList.filter(eachList => eachList.id !== id),
    }))
  }

  render() {
    const {cartList} = this.state
    localStorage.setItem('cartData', JSON.stringify(cartList))
    return (
      <CartContext.Provider
        value={{
          cartList,
          addCartItem: this.addCartItem,
          removeAllCartItems: this.removeAllCartItems,
          removeCartItem: this.removeCartItem,
          incrementCartItemQuantity: this.incrementCartItemQuantity,
          decrementCartItemQuantity: this.decrementCartItemQuantity,
        }}
      >
        <Switch>
          <Route exact path="/login" component={Login} />
          <ProtectedRoute exact path="/" component={Home} />
          <ProtectedRoute
            exact
            path="/restaurant/:id"
            component={RestaurantDetails}
          />
          <ProtectedRoute exact path="/cart" component={Cart} />
          <Route component={NotFound} />
        </Switch>
      </CartContext.Provider>
    )
  }
}

export default App

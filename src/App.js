import {Component} from 'react'
import {Route, Switch, Redirect} from 'react-router-dom'

import LoginForm from './components/LoginForm'
import Home from './components/Home'
import Products from './components/Products'
import ProductItemDetails from './components/ProductItemDetails'
import Cart from './components/Cart'
import NotFound from './components/NotFound'
import ProtectedRoute from './components/ProtectedRoute'
import CartContext from './context/CartContext'

import './App.css'

class App extends Component {
  state = {
    cartList: [],
  }

  //   TODO: Add your code for remove all cart items, increment cart item quantity, decrement cart item quantity, remove cart item

  removeAllCartItems = () => {
    this.setState({cartList: []})
  }

  removeCartItem = id => {
    const {cartList} = this.state
    this.setState({
      cartList: cartList.filter(each => id !== each.id),
    })
  }

  incrementCartItemQuantity = id => {
    const {cartList} = this.state
    const newCartList = cartList.map(eachValue => {
      if (eachValue.id === id) {
        return {...eachValue, quantity: eachValue.quantity + 1}
      }
      return eachValue
    })
    this.setState({cartList: newCartList})
  }

  decrementCartItemQuantity = id => {
    const {cartList} = this.state
    const cartItem = cartList.filter(eachValue => eachValue.id === id)
    const {quantity} = cartItem[0]
    if (quantity > 1) {
      const newCartList = cartList.map(eachValue => {
        if (eachValue.id === id) {
          return {...eachValue, quantity: eachValue.quantity - 1}
        }
        return eachValue
      })
      this.setState({cartList: newCartList})
    } else {
      this.removeCartItem(id)
    }
  }

  addCartItem = product => {
    const {cartList} = this.state
    const {quantity} = product
    const isInList = cartList.find(each => each.id === product.id)
    if (isInList === undefined) {
      this.setState(prevState => ({cartList: [...prevState.cartList, product]}))
    } else {
      this.setState(prevState => ({
        cartList: prevState.cartList.map(eachItem => {
          if (eachItem.id === product.id) {
            return {...eachItem, quantity: eachItem.quantity + quantity}
          }
          return eachItem
        }),
      }))
    }
    //   TODO: Update the code here to implement addCartItem
  }

  render() {
    const {cartList} = this.state

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
          <Route exact path="/login" component={LoginForm} />
          <ProtectedRoute exact path="/" component={Home} />
          <ProtectedRoute exact path="/products" component={Products} />
          <ProtectedRoute
            exact
            path="/products/:id"
            component={ProductItemDetails}
          />
          <ProtectedRoute exact path="/cart" component={Cart} />
          <Route path="/not-found" component={NotFound} />
          <Redirect to="not-found" />
        </Switch>
      </CartContext.Provider>
    )
  }
}

export default App

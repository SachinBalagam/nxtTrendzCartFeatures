// Write your code here
import './index.css'
import CartContext from '../../context/CartContext'

const CartSummary = () => (
  <CartContext.Consumer>
    {value => {
      const {cartList} = value
      const CartItemTotal = cartList.length
      const priceArray = cartList.map(
        eachValue => eachValue.price * eachValue.quantity,
      )
      const priceSum = priceArray.reduce((a, b) => a + b, 0)
      return (
        <div className="cartSummary-container">
          <div>
            <h1 className="order-total">
              Order Total: <span className="total-badge">{priceSum}/-</span>
            </h1>
            <p className="item-total">{CartItemTotal} Items in cart</p>
            <button type="button" className="button">
              CheckOut
            </button>
          </div>
        </div>
      )
    }}
  </CartContext.Consumer>
)

export default CartSummary

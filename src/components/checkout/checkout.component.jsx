import { useContext } from 'react';
import CartItem from '../cart-item/cart-item.component';
import './checkout.styles.scss'
import { CartContext } from '../../contexts/cart.context';
import CheckoutItem from '../checkout-item/checkout-item.component';

const Checkout = () =>{
  const { cartItems, addItemToCart, removeItemToCart } = useContext(CartContext);

  return (
    <div className='checkout-container'>
      <div className='checkout-header'>
        <div className='header-block'>
          <span>Product</span>
        </div>
        <div className='header-block'>
          <span>Description</span>
        </div>
        <div className='header-block'>
          <span>Quantity</span>
        </div>
        <div className='header-block'>
          <span>Price</span>
        </div>
        <div className='header-block'>
          <span>Remove</span>
        </div>
      </div>
        {
          cartItems.map((cartItem) => {
            return(
              <CheckoutItem key={cartItem.id} cardItem={cartItem}/>
            )
          })
        }
      <span className='total'>Total: 0</span>

    </div>
  )
}

export default Checkout;
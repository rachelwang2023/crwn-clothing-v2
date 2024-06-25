import { createContext, useReducer } from "react";
import { createAction } from "../utils/reducer/reducer.utils";

const CART_ACTION_TYPES = {
  SET_IS_CART_OPEN: 'SET_IS_CART_OPEN',
  SET_CART_ITEMS: 'SET_CART_ITEMS',
  SET_CART_COUNT: 'SET_CART_COUNT',
  SET_CART_TOTAL: 'SET_CART_TOTAL',
};

const INITIAL_STATE = {
  isCartOpen: false,
  cartItems: [],
  cartCount: 0,
  cartTotal: 0
}


const addCartItem = (cartItems, productToAdd) => {
  // find if cardItems contains productToAdd
  const existingCartItem = cartItems.find((cartItem) => 
    cartItem.id === productToAdd.id
  );

  // if found, increment quantity
  if(existingCartItem) {
    return cartItems.map((cartItem) => 
      cartItem.id === productToAdd.id ? 
      { ...cartItem, quantity: cartItem.quantity + 1} 
      : cartItem
    );
  }

  // return new array with modified carditems/ new cart item
  return [...cartItems, { ...productToAdd, quantity: 1 }];
}

const removeCartItem = (cartItems, cardItemToRemove) => {
  const existingCartItem = cartItems.find((cartItem) => 
    cartItem.id === cardItemToRemove.id
  );
  
  if(existingCartItem.quantity === 1) {
    return cartItems.filter(cartItem => cartItem.id !== cardItemToRemove.id);
  }

  if(existingCartItem) {
    return cartItems.map((cartItem) => 
      cartItem.id === cardItemToRemove.id ? 
      { ...cartItem, quantity: cartItem.quantity - 1} 
      : cartItem
    );
  }

}

const clearCartItem = (cartItems, cartItemToClear) => {
  const existingCartItem = cartItems.find((cartItem) => 
    cartItem.id === cartItemToClear.id
  );
  
  if(existingCartItem) {
    return cartItems.filter((cartItem) => 
      cartItem.id !== cartItemToClear.id
    )
  }
}

const cartReducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case CART_ACTION_TYPES.SET_CART_ITEMS:
      return {
        ...state,
        ...payload,
      };
      case CART_ACTION_TYPES.SET_IS_CART_OPEN:
      return {
        ...state,
        isCartOpen: payload,
      };
    default:
      throw new Error(`Unhandled type ${type} in cartReducer`);
  }
};

export const CartContext = createContext({
  isCartOpen: false,
  setIsCartOpen: () => {},
  cartItems: [],
  addItemToCart: () => {},
  removeItemFromCart: () => {},
  clearItemFromCart: () => {},
  cartCount: 0,
  cartTotal: 0
});


// CartProvider 组件
export const CartProvider = ({ children }) => {
  const [{ isCartOpen, cartCount, cartTotal, cartItems}, dispatch] = useReducer(cartReducer, INITIAL_STATE);
  
  const updateCartItemsReducer = (cartItems) => {
    const newCartCount = cartItems.reduce(
      (total, cartItem) => total + cartItem.quantity,
      0
    );
    const newCartTotal = cartItems.reduce(
      (total, cartItem) => total + cartItem.quantity * cartItem.price,
      0
    );

    const payload = {
      cartItems,
      cartCount: newCartCount,
      cartTotal: newCartTotal,
    };

    dispatch(createAction(CART_ACTION_TYPES.SET_CART_ITEMS, payload));
  }


  const addItemToCart = (productToAdd) => {
    const newCartItems = addCartItem(cartItems, productToAdd);
    updateCartItemsReducer(newCartItems);
  }

  const removeItemFromCart =(cartItemToRemove) => { 
    const newCartItems = removeCartItem(cartItems, cartItemToRemove);
    updateCartItemsReducer(newCartItems);
  }

  const clearItemFromCart = (cartItemToClear) => {
    const newCartItems = clearCartItem(cartItems, cartItemToClear);
    updateCartItemsReducer(newCartItems);
  }

  const setIsCartOpen = (isOpen) => {
    dispatch(createAction(CART_ACTION_TYPES.SET_IS_CART_OPEN, isOpen));
  };

  const value = { isCartOpen, setIsCartOpen, addItemToCart, removeItemFromCart,clearItemFromCart, cartItems, cartCount, cartTotal};
  
  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};
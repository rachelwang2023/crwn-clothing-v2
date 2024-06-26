import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import './index.scss';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import store from './store/store';

const rootElement = document.getElementById('root');

render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        {/* <UserProvider> */}
          {/* <CategoriesProvider> */}
            {/* <CartProvider> */}
              <App />
            {/* </CartProvider> */}
          {/* </CategoriesProvider> */}
        {/* </UserProvider> */}
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
  rootElement
);
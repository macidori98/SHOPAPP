import React from 'react';
import {Provider} from 'react-redux';
import {combineReducers, createStore} from 'redux';
import ShopNavigator from './navigation/ShopNavigator';

import productsReducer from './store/reducers/products';
import cartReducer from './store/reducers/cart';

const rootReducer = combineReducers({
  products: productsReducer,
  cart: cartReducer,
});

const store = createStore(rootReducer);

const App = props => {
  return (
    <Provider store={store}>
      <ShopNavigator />
    </Provider>
  );
};

export default App;

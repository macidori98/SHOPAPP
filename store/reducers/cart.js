import CartItem from '../../models/CartItem';
import {ADD_TO_CART, REMOVE_FROM_CART} from '../actions/cart';
import {ADD_ORDER} from '../actions/orders';
import {DELETE_PRODUCT} from '../actions/products';

/**
 * @type {import('../../Types/CustomTypes').CartStateObject}
 */
const initialState = {
  items: {}, //title, quantity, price
  totalAmount: 0,
};

/**
 * @param {import('../../Types/CustomTypes').CartStateObject} state
 * @param {import('../../Types/CustomTypes').Action} action
 */
export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      const addedProduct = action.product;
      const productPrice = addedProduct.price;
      const productTitle = addedProduct.title;

      let updatedOrNewCartItem;

      if (state.items[addedProduct.id]) {
        updatedOrNewCartItem = new CartItem(
          state.items[addedProduct.id].quantity + 1,
          productPrice,
          productTitle,
          state.items[addedProduct.id].sum + productPrice,
        );
      } else {
        updatedOrNewCartItem = new CartItem(
          1,
          productPrice,
          productTitle,
          productPrice,
        );
      }

      return {
        items: {...state.items, [addedProduct.id]: updatedOrNewCartItem},
        totalAmount: state.totalAmount + productPrice,
      };
    case REMOVE_FROM_CART:
      /**
       * @type {import('../../Types/CustomTypes').CartObj}
       */
      const selectedItem = state.items[action.pid];
      const currentQuantity = selectedItem.quantity;
      let updatedCartItem;
      if (currentQuantity > 1) {
        updatedCartItem = new CartItem(
          currentQuantity - 1,
          selectedItem.productPrice,
          selectedItem.productTitle,
          selectedItem.sum - selectedItem.productPrice,
        );

        updatedCartItem = {...state.items, [action.pid]: updatedCartItem};
      } else {
        updatedCartItem = {...state.items};
        delete updatedCartItem[action.pid];
      }

      return {
        ...state,
        items: updatedCartItem,
        totalAmount: state.totalAmount - selectedItem.productPrice,
      };

    case ADD_ORDER:
      return initialState;
    case DELETE_PRODUCT:
      if (!state.items[action.pid]) {
        return state;
      }
      const updatedItems = {...state.items};
      const itemTotal = state.items[action.pid].sum;
      delete updatedItems[action.pid];
      return {
        ...state,
        items: updatedItems,
        totalAmount: state.totalAmount - itemTotal,
      };
    default:
      return state;
  }
};

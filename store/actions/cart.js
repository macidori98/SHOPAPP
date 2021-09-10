import Product from '../../models/Product';

export const ADD_TO_CART = 'ADD_TO_CART';

/**
 * @typedef {{type: ADD_TO_CART, product: Product}} AddToCart
 */

/**
 *
 * @param {Product} product
 * @returns {AddToCart}
 */

export const addToCart = product => {
  return {type: ADD_TO_CART, product: product};
};

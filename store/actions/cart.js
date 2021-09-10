import Product from '../../models/Product';

export const ADD_TO_CART = 'ADD_TO_CART';
export const REMOVE_FROM_CART = 'REMOVE_FROM_CART';

/**
 *
 * @param {Product} product
 * @returns {import('../../Types/CustomTypes').AddToCart}
 */

export const addToCart = product => {
  return {type: ADD_TO_CART, product: product};
};

/**
 *
 * @param {string} productId
 * @returns {import('../../Types/CustomTypes').RemoveFromCart}
 */
export const removeFromCart = productId => {
  return {type: REMOVE_FROM_CART, pid: productId};
};

import PRODUCTS from '../../data/dummy-data';

/**
 * @type {{availableProducts: import('../../data/dummy-data').ProductArray, userProducts: import('../../data/dummy-data').ProductArray}}
 */
const initialState = {
  availableProducts: PRODUCTS,
  userProducts: PRODUCTS.filter(prod => prod.ownerId === 'u1'),
};

export default (state = initialState, action) => {
  return state;
};

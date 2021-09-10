import PRODUCTS from '../../data/dummy-data';

/**
 * @type {{availableProducts: import('../../Types/CustomTypes').Products, userProducts: import('../../Types/CustomTypes').Products}}
 */
const initialState = {
  availableProducts: PRODUCTS,
  userProducts: PRODUCTS.filter(prod => prod.ownerId === 'u1'),
};

export default (state = initialState, action) => {
  return state;
};

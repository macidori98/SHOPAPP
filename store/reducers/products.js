import PRODUCTS from '../../data/dummy-data';

/**
 * @type {import('../../Types/CustomTypes').ProductStateObject}
 */
const initialState = {
  availableProducts: PRODUCTS,
  userProducts: PRODUCTS.filter(prod => prod.ownerId === 'u1'),
};

export default (state = initialState, action) => {
  return state;
};

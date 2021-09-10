import Product from '../models/Product';
/**
 * @typedef {{productTitle: string, quantity: number, productPrice: number, sum: number}} CartObj
 * @typedef {{items: CartObj, totalAmount: number}} CartStateObject
 * @typedef {Product[]} Products
 * @typedef {{availableProducts: Product[], userProducts: Product[]}} ProductStateObject
 * @typedef {{type: ADD_TO_CART, product: Product}} AddToCart
 * @typedef {{type: REMOVE_FROM_CART, pid: string}} RemoveFromCart
 * @typedef {AddToCart|RemoveFromCart} Action
 */

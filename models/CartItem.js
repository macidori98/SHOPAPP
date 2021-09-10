class CartItem {
  /**
   *
   * @param {number} quantity
   * @param {number} productPrice
   * @param {string} productTitle
   * @param {number} sum
   */
  constructor(quantity, productPrice, productTitle, sum) {
    /**
     * @type {number}
     */
    this.quantity = quantity;

    /**
     * @type {number}
     */
    this.productPrice = productPrice;

    /**
     * @type {number}
     */
    this.sum = sum;

    /**
     * @type {string}
     */
    this.productTitle = productTitle;
  }
}

export default CartItem;

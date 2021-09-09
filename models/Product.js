/**
 * @class
 */
class Product {
  /**
   * @param {string} id
   * @param {string} ownerId
   * @param {stirng} title
   * @param {string} imageUrl
   * @param {string} description
   * @param {number} price
   */
  constructor(id, ownerId, title, imageUrl, description, price) {
    /**
     * @type {string}
     */
    this.id = id;
    /**
     * @type {string}
     */
    this.ownerId = ownerId;
    /**
     * @type {string}
     */
    this.title = title;
    /**
     * @type {string}
     */
    this.imageUrl = imageUrl;
    /**
     * @type {string}
     */
    this.description = description;
    /**
     * @type {number}
     */
    this.price = price;
  }
}

export default Product;

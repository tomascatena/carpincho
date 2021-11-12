import Product from '../models/product.model';

/**
 * Get all products from DB
 * @returns {Promise<Product>}
 */
export const getAllProducts = async () => {
  return Product.find({});
};

/**
 * Get product by id
 * @param {ObjectId} id
 * @returns {Promise<Product>}
 */
export const getProductById = async (id: string) => {
  return Product.findById(id);
};

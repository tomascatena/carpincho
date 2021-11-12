import express from 'express';
import {
  getProducts,
  getSingleProduct,
} from '../../controllers/products.controller';
import { productsValidation } from '../../validations';

const router = express.Router();

router.get('/', getProducts);
router.get('/:productId', productsValidation.getProductById, getSingleProduct);

export default router;

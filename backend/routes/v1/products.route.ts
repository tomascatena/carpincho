import express from 'express';
import { fetchProducts } from '../../controllers/products.controller';

const router = express.Router();

router.get('/', fetchProducts);

export default router;

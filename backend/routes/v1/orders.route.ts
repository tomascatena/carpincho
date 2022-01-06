import express from 'express';
import { addOrderItems } from '../../controllers/order.controller';
import { ordersValidation } from '../../validations';
import { protect } from '../../middlewares/auth.middleware';

const router = express.Router();

router.post('/', ordersValidation.addOrderItems, protect, addOrderItems);

export default router;

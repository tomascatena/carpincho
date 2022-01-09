import express from 'express';
import {
  addOrderItems,
  getOrderById,
  updateOrderToPaid,
} from '../../controllers/order.controller';
import { ordersValidation } from '../../validations';
import { protect } from '../../middlewares/auth.middleware';

const router = express.Router();

router.post('/', ordersValidation.addOrderItems, protect, addOrderItems);
router.get('/:orderId', ordersValidation.getOrderById, protect, getOrderById);
router.put(
  '/:orderId/pay',
  ordersValidation.updateOrderToPaid,
  protect,
  updateOrderToPaid
);

export default router;

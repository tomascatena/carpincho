import express from 'express';
import productsRoute from './products.route';
import authRoute from './auth.route';
import ordersRoute from './orders.route';

const router = express.Router();

const defaultRoutes = [
  {
    path: '/products',
    route: productsRoute,
  },
  {
    path: '/users',
    route: authRoute,
  },
  {
    path: '/orders',
    route: ordersRoute,
  },
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

export default router;

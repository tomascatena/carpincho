import express from 'express';
import productsRoute from './products.route';
import authRoute from './auth.route';

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
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

export default router;

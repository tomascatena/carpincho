import express from 'express';
import productsRoute from './products.route';

const router = express.Router();

const defaultRoutes = [
  {
    path: '/products',
    route: productsRoute,
  },
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

export default router;

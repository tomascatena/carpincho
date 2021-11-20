import express from 'express';
import {
  getUserProfile,
  loginUser,
  registerNewUser,
} from '../../controllers/auth.controller';
import { protect } from '../../middlewares/auth.middleware';
import { authValidation } from '../../validations';

const router = express.Router();

router.post('/', authValidation.registerNewUser, registerNewUser);
router.post('/login', authValidation.loginUser, loginUser);
router.get('/profile', authValidation.getUserProfile, protect, getUserProfile);

export default router;

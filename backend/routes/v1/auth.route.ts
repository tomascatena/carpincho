import express from 'express';
import { loginUser } from '../../controllers/auth.controller';
import { authValidation } from '../../validations';

const router = express.Router();

router.post('/login', authValidation.loginUser, loginUser);

export default router;

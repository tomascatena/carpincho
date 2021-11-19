import { Request, Response } from 'express';
import httpStatus from 'http-status';
import User from '../models/user.model';
import { catchAsync } from '../utils/catchAsync';

// @desc    Auth user & get token
// @route   POST /api/v1/users/login
// @access  Public
export const loginUser = catchAsync(async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    res.status(httpStatus.OK).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      token: null,
    });
  } else {
    res.status(httpStatus.UNAUTHORIZED);

    throw new Error('Invalid email or password');
  }
});

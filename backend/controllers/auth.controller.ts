import { Request, Response } from 'express';
import httpStatus from 'http-status';
import User from '../models/user.model';
import { generateAuthTokens } from '../services/token.service';
import { RequestWithBody } from '../types/types';
import { catchAsync } from '../utils/catchAsync';

// @desc    Auth user & get token
// @route   POST /api/v1/users/login
// @access  Public
export const loginUser = catchAsync(async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    const tokens = await generateAuthTokens(user._id);

    res.status(httpStatus.OK).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      isEmailVerified: user.isEmailVerified,
      tokens,
    });
  } else {
    res.status(httpStatus.UNAUTHORIZED);

    throw new Error('Invalid email or password');
  }
});

// @desc    Register a new user & get token
// @route   POST /api/v1/users
// @access  Public
export const registerNewUser = catchAsync(
  async (req: Request, res: Response) => {
    const { name, email, password } = req.body;

    const userExists = await User.findOne({ email });

    if (userExists) {
      res.status(httpStatus.BAD_REQUEST);

      throw new Error('User already exists');
    } else {
      const user = await User.create({
        name,
        email,
        password,
      });

      if (user) {
        const tokens = await generateAuthTokens(user._id);

        res.status(httpStatus.CREATED).json({
          _id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
          isEmailVerified: user.isEmailVerified,
          tokens,
        });
      } else {
        res.status(httpStatus.BAD_REQUEST);

        throw new Error('Invalid user data');
      }
    }
  }
);

// @desc    Get user profile
// @route   GET /api/v1/users/profile
// @access  Private
export const getUserProfile = catchAsync(
  async (req: RequestWithBody, res: Response) => {
    if (req.user) {
      const user = await User.findById(req.user._id);

      if (user) {
        res.status(httpStatus.OK).json({
          _id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
          isEmailVerified: user.isEmailVerified,
        });
      } else {
        res.status(httpStatus.NOT_FOUND);

        throw new Error('User not found');
      }
    } else {
      res.status(httpStatus.UNAUTHORIZED).json({
        message: 'Invalid credentials',
      });
    }
  }
);

// @desc    Update user profile
// @route   PUT /api/v1/users/profile
// @access  Private
export const updateUserProfile = catchAsync(
  async (req: RequestWithBody, res: Response) => {
    if (req.user) {
      const user = await User.findById(req.user._id);

      if (user) {
        user.name = req.body.name || user.name;
        user.email = req.body.email || user.email;
        if (req.body.password) {
          user.password = req.body.password;
        }

        const updatedUser = await user.save();

        res.status(httpStatus.OK).json({
          _id: updatedUser._id,
          name: updatedUser.name,
          email: updatedUser.email,
          role: updatedUser.role,
          isEmailVerified: updatedUser.isEmailVerified,
        });
      } else {
        res.status(httpStatus.NOT_FOUND);

        throw new Error('User not found');
      }
    } else {
      res.status(httpStatus.UNAUTHORIZED).json({
        message: 'Invalid credentials',
      });
    }
  }
);

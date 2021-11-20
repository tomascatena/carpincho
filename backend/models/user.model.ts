import mongoose from 'mongoose';
import validator from 'validator';
import { roles } from '../config/roles';
import bcrypt from 'bcryptjs';
import config from '../config/config';
export interface IUser {
  _id: string;
  name: string;
  email: string;
  password: string;
  role: string;
  isEmailVerified: boolean;
  matchPassword: (password: string) => Promise<boolean>;
}

const userSchema = new mongoose.Schema<IUser>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      validate(value: string) {
        if (!validator.isEmail(value)) {
          throw new Error('Invalid email');
        }
      },
    },
    password: {
      type: String,
      required: true,
      trim: true,
      minlength: config.MIN_PASSWORD_LENGTH,
      validate(value: string) {
        if (!value.match(/\d/) || !value.match(/[a-zA-Z]/)) {
          throw new Error(
            'Password must contain at least one letter and one number'
          );
        }
      },
    },
    role: {
      type: String,
      enum: roles,
      default: 'user',
    },
    isEmailVerified: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

userSchema.methods.matchPassword = async function (
  enteredPassword: string
): Promise<boolean> {
  return bcrypt.compare(enteredPassword, this.password);
};

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    next();
  }

  const salt = await bcrypt.genSalt(12);

  this.password = await bcrypt.hash(this.password, salt);
});

const User = mongoose.model<IUser>('User', userSchema);

export default User;

import JWT from 'jsonwebtoken';
import config from '../config/config';
import getUnixTime from 'date-fns/getUnixTime';
import addMinutes from 'date-fns/addMinutes';
import addDays from 'date-fns/addDays';
import { tokenTypes } from '../config/tokens';

/**
 * Generate token
 * @param {ObjectId} userId
 * @param {Moment} expires
 * @param {string} type
 * @param {string} [secret]
 * @returns {string}
 */
export const generateJWT = (
  userId: string,
  expires: Date,
  type: string,
  secret: string = config.JWT_SECRET
) => {
  const payload = {
    sub: userId,
    iat: getUnixTime(new Date()),
    exp: getUnixTime(expires),
    type,
  };

  return JWT.sign(payload, secret);
};

/**
 * Generate auth tokens
 * @param {ObjectId} userId
 * @returns {Promise<Object>}
 */
export const generateAuthTokens = async (userId: string) => {
  const accessTokenExpires = addMinutes(
    new Date(),
    config.JWT_ACCESS_EXPIRATION_MINUTES
  );
  const accessToken = generateJWT(
    userId,
    accessTokenExpires,
    tokenTypes.ACCESS
  );

  const refreshTokenExpires = addDays(
    new Date(),
    config.JWT_REFRESH_EXPIRATION_DAYS
  );
  const refreshToken = generateJWT(
    userId,
    refreshTokenExpires,
    tokenTypes.REFRESH
  );

  return {
    access: {
      token: accessToken,
      expires: accessTokenExpires,
    },
    refresh: {
      token: refreshToken,
      expires: refreshTokenExpires,
    },
  };
};

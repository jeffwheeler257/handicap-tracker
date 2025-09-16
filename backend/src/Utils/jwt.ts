import jwt, { JwtPayload } from "jsonwebtoken";

const SECRET_KEY = process.env.JWT_SECRET || '';

interface TokenPayload extends JwtPayload {
  userId: string;
}

// Generate JWT for a user
export const generateToken = (userId: string): string => {
  if (!SECRET_KEY) {
    throw new Error('JWT_SECRET is not defined');
  }
  // Payload is an object with userId property
  return jwt.sign({ userId }, SECRET_KEY, { expiresIn: '24h' });
};

// Verify a JWT and extract userId
export const verifyToken = (token: string): string => {
  if (!SECRET_KEY) {
    throw new Error('JWT_SECRET is not defined');
  }
  try {
    const decoded = jwt.verify(token, SECRET_KEY) as TokenPayload;
    if (!decoded.userId) {
      throw new Error('Token payload invalid: missing userId');
    }
    return decoded.userId;
  } catch (error) {
    throw new Error('Invalid token');
  }
};
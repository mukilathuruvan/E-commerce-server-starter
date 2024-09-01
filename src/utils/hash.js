import { compare, hash } from "bcrypt";
import jwt from "jsonwebtoken";

export const getHash = async (payload) => {
  const response = await hash(payload, 10);
  return response;
};

export const compareHash = async (plain, hashed) => {
  const response = await compare(plain, hashed);
  return response;
};

export const generateToken = async (payload, expiresIn) => {
  const token = await jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn,
  });

  return token;
};

export const verifyToken = async (token) => {
  try {
    const payload = await jwt.verify(token, process.env.JWT_SECRET);
    return payload;
  } catch {
    return null;
  }
};

import {
  checkOtp,
  checkOtpExists,
  removeOtp,
  saveOtpToDb,
} from "../otp/services.js";
import { generateRandomOTP, smsSender } from "../../utils/otp.js";
import { generateToken } from "../../utils/hash.js";
import { checkUserExists, createUser } from "../user/services.js";

export const sendOtp = async ({ input }) => {
  const existingOtp = await checkOtpExists(input.phone);

  if (existingOtp) {
    await removeOtp(input.phone);
  }

  const { otp, expriryAt } = generateRandomOTP();

  const response = await smsSender("8300065864");

  if (!response?.status) {
    return {
      success: false,
      phone: input.phone,
    };
  }

  await saveOtpToDb({
    otp,
    expriryAt,
    phoneNumber: input.phone,
  });

  return {
    otp,
    phone: input.phone,
    success: true,
    expriryAt: String(expriryAt),
  };
};

const verifyOtp = async ({ input }) => {
  const success = await checkOtp(input);

  await removeOtp(input.phone);

  const userFound = await checkUserExists(input.phone);

  if (userFound) {
    const token = await generateToken(userFound, "3d");
    const refreshToken = await generateToken(userFound, "1m");

    return {
      success,
      token,
      refreshToken,
    };
  }

  const userCreated = await createUser({
    phone: input.phone,
    name: input.name ?? "customer",
  });

  const token = await generateToken(userCreated, "3d");
  const refreshToken = await generateToken(userCreated, "1m");

  return {
    success,
    token,
    refreshToken,
  };
};

export default {
  sendOtp,
  verifyOtp,
};

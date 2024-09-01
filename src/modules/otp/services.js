import Otp from "./model.js";

const mobileRegex = /^\d{10}$/;

export const saveOtpToDb = async (body) => {
  if (!body.phoneNumber || !body.otp)
    throw new Error("phone number or otp is missing.");

  const otp = new Otp(body);
  const response = await otp.save();

  return response;
};

export const checkOtpExists = async (phoneNumber) => {
  if (!phoneNumber) throw new Error("phone number is missing.");

  if (!mobileRegex.test(phoneNumber))
    throw new Error("Phone number is not valid.");

  const otpFound = await Otp.findOne({
    phoneNumber,
  });

  return otpFound;
};

export const checkExperiry = async (phoneNumber) => {
  const otpFound = await checkOtpExists(phoneNumber);

  if (!otpFound) throw new Error("No otp found for given number.");

  if (!otpFound.expiry > Date.now()) throw new Error("Otp expired.");

  return otpFound;
};

export const checkOtp = async (body) => {
  if (!body.phone) throw new Error("phone number is missing.");
  if (!body.otp) throw new Error("otp is missing.");

  if (!mobileRegex.test(body.phone))
    throw new Error("Phone number is not valid.");

  const verifiedOtp = await checkExperiry(body.phone);

  if (verifiedOtp.otp !== Number(body.otp))
    throw new Error("Otp does not match.");

  return true;
};

export const removeOtp = async (phoneNumber) => {
  const response = await Otp.deleteOne({
    phoneNumber,
  });

  return {
    success: !!response,
  };
};

import User from "./model.js";
import { formatUser } from "./util.js";

export const checkUserExists = async ({ mobile, email }) => {
  if (!mobile) throw new Error("Phone number is missing.");

  const userFound = await User.findOne({ $or: [{ mobile, email }] });
  return formatUser(userFound?.toObject());
};

export const createUser = async (body) => {
  if (!body.email && !body.mobile) throw new Error("User details are empty.");

  const user = new User(body);
  await user.save();

  return user.toObject();
};

export const findUserBeforeCreation = async (input) => {
  if (!input.source) throw new Error("Source is missing.");

  const userFound = await User.findOne({
    $or: [{ mobile: input.mobile, email: input.email }],
  });

  return userFound?.toObject();
};

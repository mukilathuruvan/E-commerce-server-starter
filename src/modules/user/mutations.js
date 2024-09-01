import {
  findUserBeforeCreation,
  createUser as createUserService,
} from "./services.js";
import { generateToken } from "../../utils/hash.js";

const createUser = async ({ input }) => {
  const userFound = await findUserBeforeCreation(input);

  if (userFound) {
    const token = await generateToken(userFound, "3d");
    const refreshToken = await generateToken(userFound, "1m");

    return {
      success: true,
      token,
      refreshToken,
      name: userFound.name,
    };
  }

  const userCreated = await createUserService(input);

  const token = await generateToken(userCreated, "3d");
  const refreshToken = await generateToken(userCreated, "1m");

  return {
    success: true,
    token,
    refreshToken,
    name: userCreated.name,
  };
};

export default { createUser };

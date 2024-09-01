import User from "./model.js";

const users = async (params) => {
  const response = await User.find();
  return response.map((_id, name) => ({ id: _id, name }));
};

export default { users };

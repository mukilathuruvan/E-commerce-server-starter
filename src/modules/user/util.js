import base64 from "base-64";

export const formatUser = (user) => {
  if (!user) return null;

  const id = base64.encode(user._id);

  return {
    id,
    name: user.name,
    email: user.email,
    mobile: user.mobile,
    source: user.source,
  };
};

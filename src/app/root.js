import userQueries from "../modules/user/queries.js";
import userMutations from "../modules/user/mutations.js";
import authMutations from "../modules/auth/mutations.js";

export default {
  ...userQueries,
  ...userMutations,

  ...authMutations,
};

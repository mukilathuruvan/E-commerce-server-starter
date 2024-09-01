import AuthType from "../modules/auth/type.js";
import UserType from "../modules/user/type.js";
import appMutations from "./mutations.js";
import appQueries from "./queries.js";

const makeSchema = (...args) => {
  const schemas = args.concat(appMutations, appQueries);

  return schemas.reduce((acc, cur) => acc + cur, "");
};

const schema = makeSchema(UserType, AuthType);

export default schema;

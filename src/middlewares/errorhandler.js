import logger from "../config/logger.js";

const errorHandler = (err, _, errors) => {
  const errorsList = errors ?? [];

  errorsList.forEach((err) => {
    logger.log("error", `${err.path} - ${err.stack}`);
  });

  return errors;
};

export default errorHandler;

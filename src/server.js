import express from "express";
import { createHandler } from "graphql-http/lib/use/express";
import { buildSchema } from "graphql";
import { ruruHTML } from "ruru/server";
import schema from "./app/schema.js";
import root from "./app/root.js";
import connectDatabase from "./utils/db.js";
import errorHandler from "./middlewares/errorhandler.js";
import { autoCleanExperiedOtps } from "./utils/otp.js";
import { config } from "dotenv";

const app = express();

config({
  debug: true,
});

// centeralized route for all endpoints
app.all(
  "/graphql",
  createHandler({
    schema: buildSchema(schema),
    rootValue: root,
    formatError: errorHandler,
  })
);

// ruru schema UI
app.get("/", (_req, res) => {
  res.type("html");
  res.end(ruruHTML({ endpoint: "/graphql" }));
});

app.listen(8080, async () => {
  await connectDatabase();
  autoCleanExperiedOtps();
  console.log("Running a GraphQL API server at http://localhost:8080/graphql");
});

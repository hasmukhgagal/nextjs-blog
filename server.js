const express = require("express");
const registerServices = require("@workpop/graphql-proxy").default;
const expressPlayground = require("graphql-playground-middleware-express")
  .default;
const types = require("./schema.js");
const { API_KEY, API_URL } = require("./settings.js");

const SERVICE_CONFIG = {
  APPSYNC: {
    address: API_URL,
    typeDefs: types,
  },
};

const PORT = 4000;
const app = express();
app.get("/playground", expressPlayground({ endpoint: "/graphql" }));

registerServices({
  SERVICE_CONFIG,
  server: app,
  masterTypeDefs: types,
  customHeaders: {
    "x-api-key": API_KEY,
  },
  enableGrqphiQL: true,
}).then(() => {
  app.listen(PORT, () =>
    console.log(
      `Running playground proxy on http://localhost:${PORT}/playground`
    )
  );
});

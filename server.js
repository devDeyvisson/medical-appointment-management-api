const express = require("express");
const router = require("./src/router/routes");

const app = express();

const PORT = 3000;

app.use(express.json());

app.use(function (error, request, response, next) {
  console.error(error.stack);
  response.status(500).send("Something Broker!");
});

app.use("/", router);

app.listen(PORT, () => {
  console.log(`Exemple app listening on port ${PORT}`);
});

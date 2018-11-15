const express = require("express");
const axios = require("axios");
const { decycle } = require("json-cycle");
const app = express();

app.use((_, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.get("/:location", (req, res) =>
  axios
    .get(
      `http://api.zoopla.co.uk/api/v1/property_listings.json?area=${
        req.params.location
      }&api_key=ap73sggubjaktxkrtvegzsga`,
      {
        headers: ["Access-Control-Allow-Origin: *"]
      }
    )
    .then(resp => res.json(decycle(resp)))
);

const port = process.env.port || 80

app.listen(3030, () => console.log(`listening on ${port}`));

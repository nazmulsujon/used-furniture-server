const express = require("express");
const cors = require("cors");
// The dotenv package is a zero-dependency module that loads environment variables from a file into process.env. This allows developers to keep sensitive information like API keys, database credentials, and other configuration.
require("dotenv").config();
const { MongoClient, ServerApiVersion } = require("mongodb");
const app = express();

const port = process.env.PORT || 5000;

//middle ware
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.redirect("https://dammamusedfurniture.com/");
});

// Replace the uri string with your MongoDB deployment's connection string.
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.pdzsrjb.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

async function run() {
  try {
    const productsCollection = client.db("UsedFurnitureDammam").collection("products");

    // all products API
    app.get("/products", async (req, res) => {
      const query = {};
      const products = await productsCollection.find(query).sort({ id: 1 }).toArray();
      res.send(products);
    });

    // get single product by id
    app.get("/product/:id", async (req, res) => {
      const requestId = req.params.id;
      const query = { id: requestId };
      const product = await productsCollection.findOne(query);
      res.send(product);
    });
  } finally {
  }
}
run().catch((err) => console.error(err));

app.listen(port, () => {
  console.log("Used Furniture Server running", port);
});

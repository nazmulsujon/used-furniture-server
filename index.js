const express = require("express");
const cors = require("cors");
const app = express();

const port = process.env.PORT || 5000;
//middle ware
app.use(cors());
app.use(express.json());

const products = require("./data/products.json");

app.get("/products", (req, res) => {
  res.send(products);
});

// app.get("/courses/:id", (req, res) => {
//   const id = req.params.id;
//   const selectedCourse = courses.find((course) => course.id === id);
//   res.send(selectedCourse);
// });

app.get("/", (req, res) => {
  res.send("Used Furniture Server is running");
});

app.listen(port, () => {
  console.log("Used Furniture Server running", port);
});

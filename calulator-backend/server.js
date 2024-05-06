const express = require("express");
const mongoose = require("mongoose");
const CalcModel = require("./model");
require("dotenv").config();
console.log(process.env.MONGO_URL);
const port = 3000; // Use the PORT environment variable
const app = express();
app.use(express.json());
const cors = require("cors");
mongoose.connect(process.env.MONGO_URL);
app.use(cors());
app.post("/send", (req, res) => {
  CalcModel.create(req.body)
    .then((e) => res.json(e))
    .catch((e) => res.json(e));
});
app.delete("/delete-all", (req, res) => {
  // Delete all entries from the collection
  CalcModel.deleteMany({})
    .then(() => res.json({ message: "All entries deleted successfully" })) // Respond with success message
    .catch((error) => res.status(500).json({ error: error.message })); // Handle errors
});
app.get("/getCalc", async (req, res) => {
  try {
    const allData = await CalcModel.find();

    res.json(allData);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
app.listen(port, () => {
  console.log(`server is running ${port}`);
});

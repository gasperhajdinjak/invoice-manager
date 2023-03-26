const express = require("express");
const cors = require("cors");
const axios = require("axios");
const bodyParser = require("body-parser");

const app = express();
const PORT = process.env.PORT || 5000;


// vspostavitev serverja za bypassanje CORS errorja
app.use(cors());
app.use(cors({ origin: "http://localhost:3000" }));

app.use(bodyParser.json());

app.get("/api/invoice", async (req, res) => {
  
  const API = "https://apica.iplus.si/api/Naloga?API_KEY=554F28D6-82E4-406C-979B-F9DB5A2D4C91";
  try {
    const response = await axios.get(API);
    res.json(response.data);
  } catch (error) {
    console.error("Error fetching data from API:", error);
    res.status(500).json({ error: "An error occurred while fetching the data." });
  }
});


app.post("/api/update-invoice", async (req, res) => {
  const externalServiceUrl = "https://apica.iplus.si/api/Naloga?API_KEY=554F28D6-82E4-406C-979B-F9DB5A2D4C91";

  try {
    const response = await axios.post(externalServiceUrl, req.body, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    res.status(200).json({ message: "Invoice updated successfully" });
  } catch (error) {
    console.error("Error updating invoice:", error);
    res.status(500).json({ error: "An error occurred while updating the invoice." });
  }
});


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

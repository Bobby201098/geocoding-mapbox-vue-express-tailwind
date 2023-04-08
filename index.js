// initialize server
const express = require("express");
const cors = require("cors");
const { default: axios } = require("axios");

require("dotenv").config();

const PORT = process.env.PORT || 3000;

// initialize express and cors
const app = express();
app.use(cors());

// initialize routes
app.get("/api/search/:query", async (req, res) => {
    try {
        const query = req.params.query;
        const results = await axios(`https://api.mapbox.com/geocoding/v5/mapbox.places/${query}.json?access_token=${process.env.API_KEY}`)
        console.log(query)
        const data = results.data;
        console.log(data)
        res.status(200).json(data)
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
})

app.listen(PORT, () => console.log(`app has started on port: ${PORT}`));
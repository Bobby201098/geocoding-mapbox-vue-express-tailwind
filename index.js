// initialize server
const express = require("express");
const cors = require("cors");

require("dotenv").config();

const PORT = process.env.PORT || 3000;

// initialize express and cors
const app = express();
app.use(cors());

// initialize routes
app.use("/api/search", require("./routes/search-results.js"))

app.listen(PORT, () => console.log(`app has started on port: ${PORT}`));
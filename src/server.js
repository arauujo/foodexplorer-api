require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const routes = require("./routes");

app.use(cors());
app.use(express.json());
app.use(routes);

app.use((err, _req, res, _next) => {
  console.error(err.stack);
  res
    .status(500)
    .json({ error: "Something went wrong!", details: err.message });
});

const PORT = process.env.PORT || 3333;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

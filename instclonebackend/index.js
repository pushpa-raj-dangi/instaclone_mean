const express = require("express");
const cors = require("cors");
const app = express();
const mongoose = require("mongoose");
const PORT = 4000;
const { MONGOURI } = require("./keys");

app.use(cors());

mongoose
  .connect(MONGOURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((conn) => console.log("connected", conn))
  .catch((error) => console.log("errorr", error));

require("./model/user");
require("./model/post");

app.use(express.json());

app.use(require("./routes/auth"));
app.use(require("./routes/post"));
app.use(require("./routes/user"));

mongoose.model("User");

app.listen(PORT, () => {
  console.log("http://localhost:4000");
});

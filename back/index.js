const express = require("express");
const cors = require("cors");
const app = express(); 

app.use(express.json());
app.use(cors());
app.use("/city",require("./routes/data.js"));

const PORT = 4000;

app.listen(PORT, () => {
    console.log(`Server is running on PORT ${PORT}`);
});

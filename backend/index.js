const express = require('express');
const cors = require("cors");
const rootRouter = require("./routes/index");

const app = express();

app.use(cors({
    origin: [
        "*"
    ]
}));
app.use(express.json());

app.use((req, res, next) => {
    res.header({"Access-Control-Allow-Origin": "*"});
    next();
  }) 

app.use("/api/v1", rootRouter);

app.listen(3000);
const express = require('express');
const cors = require("cors");
const rootRouter = require("./routes/index");

const app = express();

app.use(cors({
    origin: ["https://pay-dn1v6zw04-akshay-kumars-projects-5a1eec33.vercel.app"],
    methods: ["POST","GET","PUT"],
    credentials: true
}));
app.use(express.json());

app.use("/api/v1", rootRouter);

app.listen(3000);
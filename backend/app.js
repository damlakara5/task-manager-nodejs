const express = require("express")
const cors = require("cors")
const ticketRouter = require("./routes/ticketRoutes")
const userRouter = require("./routes/userRoutes")


const app = express()

app.use(cors())
app.use(express.json())


app.use("/tickets", ticketRouter)
app.use("/", userRouter)
app.use((err, req, res, next) => {
    res.status(500).send({ message: err.message });
  });

module.exports = app

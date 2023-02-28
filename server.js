const express = require('express')
const morgan = require('morgan')
const dotenv = require('dotenv')
const sportsRouter = require("./routes/api/sports")
const eventsRouter = require("./routes/api/events")
const eventsDataRouter = require("./routes/api/eventData")

const app = express()

app.use(express.json())

dotenv.config({path: "./config.env"})

if (process.env.NODE_ENV === "development") {
    app.use(morgan("dev"));
}

app.use("/api/all-sports", sportsRouter)
app.use("/api/event", eventsRouter)
app.use("/api/event-data", eventsDataRouter)

const port = process.env.PORT || 5000;
if (process.env.NODE_ENV !== 'test') {
    const server = app.listen(port, () => `Server started on port ${port}`);
    module.exports = server;
}

module.exports = {app};
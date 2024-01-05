import express from "express";
import bodyParser from "body-parser";
import cors from "cors"

import route from './routes/routes.js';

const app = express()
app.use(cors())
app.use(express.json())
app.use(bodyParser.urlencoded({
  extended: true
}))
app.use(bodyParser.json())

app.use('/api/wiki-search/', route)


const Port = 2000
app.listen(Port, () => {
  console.log("Server running!!!");
})

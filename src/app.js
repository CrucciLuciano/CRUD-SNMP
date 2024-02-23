import express from "express"
import { AP_netSNMP } from "./routes/accessPoint.router.js"
import handlebars from "express-handlebars"
import { __dirname } from "./utils.js";
import path from "path";

const app = express()
const PORT = 8080

const HttpServer = app.listen(PORT, () => {
    console.log(`APP corriendo en el http://localhost:${PORT}`)
})

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

//handlebars
app.engine("handlebars", handlebars.engine())
app.set("view engine", "handlebars")
app.set("views", path.join(__dirname, "views"));

//EndPoints
app.use("/netSNMP", AP_netSNMP)

app.get("*", (req, res) => {
    return res.status(404).json({
        status: "error",
        msg: "Ruta no encontrada",
        data: {}
    })
})
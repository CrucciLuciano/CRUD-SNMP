import express from "express"
import { AP_netSNMP } from "./routes/accessPoint.router.js"
import handlebars from "express-handlebars"
import { __dirname } from "./utils.js";
import path from "path";
import cookieParser from "cookie-parser";
import session from "express-session";
import MongoStore from "connect-mongo";

import viewRouter from "./routes/views.router.js"
import sessionRouter from "./routes/session.router.js"

const app = express()
const PORT = 8080
const mongoUrl = "mongodb://localhost:27017/"

const HttpServer = app.listen(PORT, () => {
    console.log(`APP corriendo en el http://localhost:${PORT}`)
})

//Configuracion de las Sessiones
app.use(session({
    store: MongoStore.create({
        mongoUrl,
        dbName: "sessions",
        ttl: 1000
    }),
    secret: "secret",
    resave: true,
    saveUninitialized: true
}))

app.use(cookieParser("myKey"))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, "/public")))

//handlebars
app.engine("handlebars", handlebars.engine())
app.set("view engine", "handlebars")
app.set("views", path.join(__dirname, "views"));

//EndPoints
app.use("/netSNMP", AP_netSNMP)

app.use("/", viewRouter)
app.use("/api/session", sessionRouter)


function auth(req, res, next) {
    return req.session?.user ? next() : res.status(401).send("Auth error")
}

app.get("/private", auth, (req, res) => res.send("private page"))

app.get("*", (req, res) => {
    res.redirect("/netSNMP")
})

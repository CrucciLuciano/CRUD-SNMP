import { Router } from "express";
import UserModel from "../dto/dao/user.model.js";
import { createHash, isValidPassword } from "../utils.js";

const sessionRouter = Router()

sessionRouter.post("/singup", async (req, res) => {
    const userNew = req.body
    userNew.password = createHash(req.body.password)
    await UserModel.create(userNew)
    res.redirect("/login")
})

sessionRouter.post("/login", async (req, res) => {
    const { email, password } = req.body

    const user = await UserModel.findOne({ email }).lean().exec()
    if (!user) { return res.redirect("/login") }
    if (!isValidPassword(user, password)) { res.redirect("/login") }

    req.session.user = user
    res.redirect("/profile")
})

sessionRouter.get("/logout", async (req, res) => {
    req.session.destroy(err => {
        if (err) return res.send("Longout")
        res.redirect("/login")
    })
})

export default sessionRouter
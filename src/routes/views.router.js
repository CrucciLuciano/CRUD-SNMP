import { Router } from "express";

const router = Router()

router.get("/login", (req, res) => {
    if (req.session?.user) {
        return res.redirect("/profile")
    }
    res.render("login", {})
})

router.get("/singup", (req, res) => {
    if (req.session?.user) {
        return res.redirect("/profile")
    }
    res.render("singup", {})
})

router.get("/profile", auth, (req, res) => {
    const user = req.session.user
    res.render("profile", user)
})

function auth(req, res, next) {
    if (req.session?.user) return next()
    res.redirect("/login")
}

export default router
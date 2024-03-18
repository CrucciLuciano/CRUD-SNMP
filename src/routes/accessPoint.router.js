import express from "express"
import { createAPGet, createAPost, deleteAP, getAP, upDateAP, updateAll } from "../controllers/accesPoint.controller.js";

export const AP_netSNMP = express.Router()

AP_netSNMP.get("/", getAP);

AP_netSNMP.get("/createAP", createAPGet)

AP_netSNMP.post("/createAP", createAPost)

AP_netSNMP.put("/:ip", upDateAP)

AP_netSNMP.delete("/:ip", deleteAP)

AP_netSNMP.post("/updateAll", updateAll)
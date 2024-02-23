import express from "express"
import { createAP, getAP, upDateAP } from "../controllers/accesPoint.controller.js";

export const AP_netSNMP = express.Router()

AP_netSNMP.get("/", getAP);

AP_netSNMP.post("/", createAP)

AP_netSNMP.put("/:IP", upDateAP)
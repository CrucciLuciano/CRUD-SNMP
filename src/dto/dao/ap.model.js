import mongoose from "mongoose";

const apSchema = mongoose.model("Comodoro", new mongoose.Schema({
    Node: { type: String, default: "Default" },
    ip: { type: String, unique: true },
    technology: { type: String, },
    availability: { type: Boolean, default: true },
    frequency: { type: Number, default: 0 },
    channel: { type: Number, default: 20 },
    countSM: { type: Number, default: 0 },
    MB: { type: Number, default: 0 },
    serviceMax: { type: Number, default: 6 }
}), "Comodoro")

export default apSchema
import mongoose from "mongoose";

const UserModel = mongoose.model("users", new mongoose.Schema({
    first_name: String,
    last_name: String,
    email: String,
    password: String
}))

export default UserModel
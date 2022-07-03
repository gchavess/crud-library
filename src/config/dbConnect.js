import mongoose from "mongoose";

mongoose.connect("mongodb+srv://admin:admin@cluster0.9l5gva5.mongodb.net/crud-library");

let db = mongoose.connection;

export default db;
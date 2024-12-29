const mongoose = require("mongoose")

const todoSchema = new mongoose.Schema({
    work: String
});
module.exports = mongoose.model("works", todoSchema);
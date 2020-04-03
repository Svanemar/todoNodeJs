const mongoose = require("mongoose");
const schemaTodo = new mongoose.Schema(
    {
        text: { type: String, required: true, min: 5 },
        date: { type: Date, required: true },
    }
)

const Todo = mongoose.model("Todo", schemaTodo);

module.exports = Todo;
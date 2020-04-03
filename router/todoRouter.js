const express = require("express");
const Todo = require("../model/todo")
const router = express.Router();

router.post("/createtodo", async (req, res) => {

    const todo = new Todo({
        text: req.body.text,
        date: req.body.date
    })

    const response = await todo.save();
    res.redirect("/todo")
})

const items = 5;

router.get("/todo", async (req, res) => {
    const bydate = req.query.date;
    const page = req.query.page


    const todos = await Todo.find().sort({ date: bydate })
        .skip((page - 1) * items)
        .limit(items);

    res.render("todo", { todos });
})

router.get("/delete/:id", async (req, res) => {
    await Todo
        .deleteOne({ _id: req.params.id });
    res.redirect("/todo")
})


router.get("/update/:id", async (req, res) => {

    const response = await Todo.findById({ _id: req.params.id })
    console.log(response);

    res.render("edit", { response })
})

router.post("/update/:id", async (req, res) => {

    await Todo.updateOne({ _id: req.body._id },
        { $set: { text: req.body.text } },
        { runValidators: true })
    console.log(req.body);
    res.redirect("/todo")
})

module.exports = router;

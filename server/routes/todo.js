const express = require("express");
const router = express.Router();
const checkToken = require("../middlewares/tokenchecker").checkToken;
const Todo = require("../models/todo");

router.get("/version", function (req, res, next) {
    return res.status(200).json({
        name: "Todo API",
        version: "1.0.0"
    });
});

router.get("/", checkToken, async function (req, res, next) {
    try {
        let q = req.query.q ? req.query.q : null;
        let page = req.query.page ? req.query.page : null;
        let perPage = req.query.perPage ? req.query.perPage : null;

        if (q == null) {
            if (page == null || perPage == null) {
                const todos = await Todo.find();

                // return res.status(200).json(
                //     todos
                // );
                return res.status(200).json({
                    status: "ok",
                    message: "List todo berhasil.",
                    data: todos
                });
            } else {
                const todos = await Todo.find().sort({ createdAt: -1 }).skip(page * perPage).limit(perPage);

                // return res.status(200).json(
                //     todos
                // );
                return res.status(200).json({
                    status: "ok",
                    message: "List todo berhasil.",
                    data: todos
                });
            }
        } else {
            if (page == null || perPage == null) {
                const todos = await Todo.find({
                    title: {
                        $regex: q,
                        $options: 'i'
                    }
                });

                // return res.status(200).json(
                //     todos
                // );
                return res.status(200).json({
                    status: "ok",
                    message: "List todo berhasil.",
                    data: todos
                });
            } else {
                const todos = await Todo.find({
                    title: {
                        $regex: q,
                        $options: 'i'
                    }
                }).sort({ createdAt: -1 }).skip(page * perPage).limit(perPage);

                // return res.status(200).json(
                //     todos
                // );
                return res.status(200).json({
                    status: "ok",
                    message: "List todo berhasil.",
                    data: todos
                });
            }
        }
    } catch (err) {
        console.log(err.message);

        return res.status(500).json({
            status: "error",
            message: "server error: " + err.message,
            data: false
        });
    }

});

router.post("/", checkToken, async function (req, res, next) {
    const { title, description } = req.body;
    try {
        if (req.role != "admin") {
            return res.status(400).json({
                status: "error",
                message: "Hanya admin yang bisa create.",
                data: false
            });
        }

        let todo = new Todo({
            title: title,
            description: description
        });

        await todo.save();

        return res.status(200).json({
            status: "ok",
            message: "Create todo berhasil.",
            data: todo
        });
    } catch (err) {
        console.log(err.message);

        return res.status(500).json({
            status: "error",
            message: "server error: " + err.message,
            data: false
        });
    }
});

router.get("/:id", checkToken, async function (req, res, next) {
    try {
        const todo = await Todo.findOne({
            _id: req.params.id
        });

        return res.status(200).json({
            status: "ok",
            message: "Read todo berhasil.",
            data: todo
        });
    } catch (err) {
        console.log(err.message);

        return res.status(500).json({
            status: "error",
            message: "server error: " + err.message,
            data: false
        });
    }
});

router.put("/", checkToken, async function (req, res, next) {
    const { id, title, description } = req.body;
    try {
        if (req.role != "admin") {
            return res.status(400).json({
                status: "error",
                message: "Hanya admin yang bisa update.",
                data: false
            });
        }

        let ret = await Todo.findOneAndUpdate({
            _id: id
        }, {
            $set: {
                title: title,
                description: description
            }
        }, {
            new: true
        });

        return res.status(200).json({
            status: "ok",
            message: "Update todo berhasil.",
            data: ret
        });
    } catch (err) {
        console.log(err.message);

        return res.status(500).json({
            status: "error",
            message: "server error: " + err.message,
            data: false
        });
    }
});

router.delete("/", checkToken, async function (req, res, next) {
    const { id } = req.query;
    try {
        if (req.role != "admin") {
            return res.status(400).json({
                status: "error",
                message: "Hanya admin yang bisa delete.",
                data: false
            });
        }

        const ret = await Todo.findOneAndDelete({
            _id: id
        });

        return res.status(200).json({
            status: "ok",
            message: "Update todo berhasil.",
            data: ret
        });
    } catch (err) {
        console.log(err.message);

        return res.status(500).json({
            status: "error",
            message: "server error: " + err.message,
            data: false
        });
    }
});

module.exports = router;
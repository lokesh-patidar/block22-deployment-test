const express = require("express");
const { NotesModel } = require("../model/notes.model");
const notesRouter = express.Router();

notesRouter.get("/", async (req, res) => {
    try {
        let notes = await NotesModel.find();
        res.send(notes);
        console.log(notes);
    } catch (err) {
        res.send("Something went wrong!");
        console.log(err);
    }
});


notesRouter.post("/create", async (req, res) => {
    const payload = req.body;
    try {
        const notes = new NotesModel(payload);
        await notes.save();
        res.send("Created the note");
    } catch (err) {
        console.log(err);
        res.send({ msg: "soething went wrong" });
    }
});


notesRouter.patch("/update/:id", async (req, res) => {
    const payload = req.body;
    const id = req.params.id;
    const note = await NotesModel.findOne({ "_id": id });
    const userId_in_note = note.userID;
    const userId_making_req = req.body.userID;

    try {
        if (userId_making_req !== userId_in_note) {
            res.send({ message: "You are not authorised!" });
        } else {
            await NotesModel.findByIdAndUpdate({ "_id": id }, payload);
            res.send("Notes Updated!");
        }
    } catch (error) {
        console.log(err);
        res.send({ msg: "soething went wrong" });
    }
});


notesRouter.delete("/delete/:id", async (req, res) => {
    const id = req.params.id;
    const note = await NotesModel.findOne({ "_id": id });
    const userId_in_note = note.userID;
    const userId_making_req = req.body.userID;
   
    try {
        if (userId_making_req !== userId_in_note) {
            res.send({ message: "You are not authorised!" });
        } 
        else {
            await NotesModel.findByIdAndDelete({ "_id": id });
            res.send("Notes Deleted!");
        }
    } catch (error) {
        console.log(err);
        res.send({ msg: "soething went wrong" });
    }
})

module.exports = { notesRouter };

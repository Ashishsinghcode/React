const express = require('express')
const router = express.Router()
const fetchUser = require('../middleware/fetchuser')
const Notes = require('../models/Notes')
const { body, validationResult } = require('express-validator');


//ROUTE : 1 : For getting all the notes of a particular user
router.get('/fetchallnotes', fetchUser, async (req, res) => {
    const notes = await Notes.find({ user: req.user.id });
    res.json(notes)
})


//ROUTE : 2 : Adding notes to the server /Login required
router.post('/addnotes', fetchUser, [
    body('title', 'Enter a valid title').isLength({ min: 5 }),
    body('description', 'Enter a valid description').isLength({ min: 5 }),

], async (req, res) => {
    const { title, description, tag } = req.body
    //If there are errors it send bad response
    const result = validationResult(req);
    try {
        if (!result.isEmpty()) {
            res.status(400).json(result.errors[0].msg);
        }
        // console.log(req.user)
        const note = new Notes({
            title, description, tag, user: req.user.id
        })
        const saveNote = await note.save()
        res.json(saveNote)

    } catch (error) {
        res.status(500).json("Some error occured" + error)

    }
})

//ROUTE : 3 UPDATE AN EXISTING NOTE // LOGIN REQUIRED
router.put('/updatenotes/:id', fetchUser, async (req, res) => {
    const { title, description, tag } = req.body
    //If there are errors it send bad response
    try {

        const newNote = {}
        if (title) { newNote.title = title };
        if (title) { newNote.description = description };
        if (title) { newNote.tag = tag };

        //Check the user who update and make sure that note belong to same user

        //Find the note to be updated
        let note = await Notes.findById(req.params.id);
        if (!note) {
            return res.status(404).send("Note not found")
        }
        if (note.user.toString() !== req.user.id) {
            return res.status(401).send("Not allowed to update")
        }
        
        note = await Notes.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true })
        res.json(note)

    } catch (error) {
        res.status(500).json("Some error occured" + error)
    }
})

//ROUTE : 4 DELETE AN EXISTING NOTE // LOGIN REQUIRED
router.delete('/deletenotes/:id', fetchUser, async (req, res) => {
    try {
        //Find the note to be deleted
        let note = await Notes.findById(req.params.id);
        if (!note) {
            return res.status(404).send("Note not found")
        }
        //Allow delettion if user own this note
        if (note.user.toString() !== req.user.id) {
            return res.status(401).send("Not allowed to Delete")
        }
        note = await Notes.findByIdAndDelete(req.params.id)
        res.json({ "Success": "Note deleted Successfully", note: note })
    }
    catch (error) {
        res.status(500).json("Some error occured" + error)
    }
})


module.exports = router
import React, {useContext,useEffect, useRef, useState } from 'react'
import Noteitem from './Noteitem'
import AddNote from './AddNote'
import noteContext from '../context/notes/NoteContext'


function Notes() {
    const context = useContext(noteContext)
    const { notes, getallnotes, editnote } = context
    const [note, setNote] = useState({id:"" ,etitle: "", edescription: "", etag: ""})
    
    useEffect(() => {
        getallnotes()
        /*eslint-disable */
    }, [])

    const updateNote = (currentNote) => {

        ref.current.click()
        setNote({id:currentNote._id, etitle: currentNote.title, edescription: currentNote.description, etag: currentNote.tag })
    }
    const ref = useRef(null)

    const onchange = (e) => {
        setNote({ ...note,[e.target.name]: e.target.value })
       
    }
    const handleClick = (e) => {
        e.preventDefault()
        editnote(note.id, note.etitle, note.edescription, note.etag)
        // setNotes([...notes,{title:note.etitle,description: note.edescription,tag: note.etag}])

    }
    return (
        <>
            <AddNote />

            <button ref={ref} className="" data-bs-toggle="modal" data-bs-target="#exampleModal" hidden></button>
            <div className="modal fade" id="exampleModal" tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Update Note</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form className='my-2'>
                                <div className="form-group">
                                    <label htmlFor="exampleInputtitle1">Title</label>
                                    <input type="text" className="form-control" id="title" name='etitle' aria-describedby="titleHelp" placeholder="Enter title" value={note.etitle} onChange={onchange} />

                                </div>
                                <div className="form-group my-2">
                                    <label htmlFor="exampleInputDescription1">Description</label>
                                    <textarea className="form-control" name='edescription' id="description" placeholder="Description" onChange={onchange} value={note.edescription} ></textarea>
                                </div>
                                <div className="form-group my-2">
                                    <label htmlFor="exampleInputtag">Tag</label>
                                    <input type='text' className="form-control" id="exampleInputtag"name='etag' value={note.etag}  placeholder="Enter tag " onChange={onchange} />
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" data-bs-dismiss="modal" onClick={handleClick} className="btn btn-primary">Update</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className='row'>
                <div className='container '>
                    <div className='row'>
                    <h1 className='text-center'>Your Notes</h1>

                        {notes.map((note, key) => {
                            return <Noteitem key={key} updatenote={updateNote} note={note} />
                        })}

                    </div>
                </div>
            </div>
        </>
    )
}

export default Notes

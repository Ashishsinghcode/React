import React, { useContext, useState } from 'react'
import noteContext from '../context/notes/NoteContext'

function AddNote() {
    const context = useContext(noteContext)
    const { notes, setNotes, addnote } = context
    const [note, setNote] = useState({ title: '', description: '', tag: '' })

    
    
    const onchange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value })
    }
    const handleClick = () => {
        addnote(note.title, note.description, note.tag)
        setNotes([...notes,{title:note.title,description: note.description,tag: note.tag}])
        // setNotes([...notes,])
    }
    return (
        <><div className='row'>

            <div className='container' style={{marginTop:'100px'}}>
                <div className='row'>
                    <div className='col-md-2'></div>
                    <div className='col-md-8'>

                        <h1 className='text-center'>Add a Note</h1>
                        <form className='my-2'>
                            <div className="form-group">
                                <label htmlFor="exampleInputtitle1">Title</label>
                                <input type="title" className="form-control" id="title" name='title' aria-describedby="titleHelp" placeholder="Enter title" onChange={onchange} />

                            </div>
                            <div className="form-group my-2">
                                <label htmlFor="exampleInputDescription1">Description</label>
                                <textarea className="form-control" name='description' id="description" placeholder="Description" onChange={onchange} ></textarea>
                            </div>
                            <div className="form-group my-2">
                                <label htmlFor="exampleInputtag">Tag</label>
                                <input className="form-control" id="exampleInputtag" name='tag' placeholder="Enter tag " onChange={onchange} />
                            </div>

                            <button type="button" onClick={handleClick} className="btn btn-primary">Add Note</button>
                        </form>

                    </div>
                </div>
            </div>
        </div>
        </>
    )
}

export default AddNote

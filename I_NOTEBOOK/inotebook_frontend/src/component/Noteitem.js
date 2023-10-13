import React, { useContext } from 'react'
import noteContext from '../context/notes/NoteContext'

function Noteitem(props) {
    const context = useContext(noteContext)
    const { deletenote } = context
    const { note , updatenote } = props
    return (
        <>
            <div className='col-md-3'>
                <div className="card mb-3" style={{ width: '15rem' }}>
                    <div className="card-body">
                        <div className='d-flex '>
                        <h5 className="card-title">{note.title}</h5>
                        <i className=" mx-2 fa-solid fa-trash text-danger" onClick={()=>{deletenote(note._id)}}></i>
                        <i className=" mx-2 fa-regular fa-pen-to-square" onClick={()=>{updatenote(note)}}></i>

                        </div>
                        <h6 className="card-subtitle mb-2 text-muted">{note.tag}</h6>
                        <p className="card-text">{note.description}</p>
                        {/* <a href="#" className="card-link">Card link</a>
                    <a href="#" className="card-link">Another link</a> */}
                    </div>
                </div>
            </div>
        </>
    )
}

export default Noteitem

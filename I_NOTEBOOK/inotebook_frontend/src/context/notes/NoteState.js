// import { useState } from 'react'
import { useState } from 'react';
import NoteContext from './NoteContext'

const NoteState = (props) => {
   const {handleAlert} = props
    const host = "http://localhost:5000"


    const getallnotes = async () => {

       try{ const response = await fetch(`${host}/api/notes/fetchallnotes`, {
            method: "GET", // *GET, POST, PUT, DELETE, etc.
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem('token')
            },
        });
        const json = await response.json();
        setNotes(json)
    }
    catch(err){
        handleAlert(err,"danger")
    }}


    //ADD NOTE
    const addnote = async (title, description, tag) => {
        const response = await fetch(`${host}/api/notes/addnotes`, {
            method: "POST", // *GET, POST, PUT, DELETE, etc.
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem('token')
            },
            body: JSON.stringify({ title, description, tag }),
        });
        // setNotes({title:title,description:description,tag:tag})
        const json = await response.json();
        json.status === 200 ?handleAlert(json.msg,"success"): handleAlert(json.msg,"danger")


    }

    //DELETE NOTE
    const deletenote = async (id) => {
        const response = await fetch(`${host}/api/notes/deletenotes/${id}`, {
            method: "DELETE", // *GET, POST, PUT, DELETE, etc.
            headers: {
                "Content-Type": "application/json",
                "auth-token":localStorage.getItem('token')
            },

        });
        const newNotes = notes.filter((note) => { return note._id !== id })
        setNotes(newNotes)
        const json = await response.json();
        json.status === 200 ?handleAlert(json.msg,"success"): handleAlert(json.msg,"danger")

        

       

    }

    //EDIT NOTE
    const editnote = async (id, title, description, tag) => {
        //API CALL
        const response = await fetch(`${host}/api/notes/updatenotes/${id}`, {
            method: "PUT", // *GET, POST, PUT, DELETE, etc.
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem('token')
            },
            body: JSON.stringify({ title, description, tag }),
        });
        const json = await response.json();
        json.status === 200 ?handleAlert(json.msg,"success"): handleAlert(json.msg,"danger")
       
       


        //Logic to edit client
        let newNotes = JSON.parse(JSON.stringify(notes))
        for (let index = 0; index < notes.length; index++) {
            const element = notes[index];
            if (element._id === id) {
                newNotes[index].title = title
                newNotes[index].description = description
                newNotes[index].tag = tag
                break;
            }
            setNotes(newNotes)
        }
    }

    const [notes, setNotes] = useState([])

    return (
        <NoteContext.Provider value={{ notes, setNotes, addnote, deletenote, editnote, getallnotes }} >
            {props.children}
        </NoteContext.Provider>
    );
}

export default NoteState

'use client'
import { useState, useEffect } from "react"


export default function NotesForm() {
    const [notes, setNotes] = useState([]);
    const [newNote, setNewNote] = useState({title:'', body:''})
    
    const fetchNotes = async () => {
        const response = await fetch('http://localhost:3000/notes')
        const data = await response.json()
        setNotes(data)
    }

    const addNote = async () => {
        const response = await fetch('http://localhost:3000/notes', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newNote),
        })
        if (response.status === 201) {
            setNewNote({title:'', body:''})
            fetchNotes();
        }

    }

    const deleteNote =async (id) => {
        const response = await fetch(`http://localhost:3000/notes/${id}`, {
            method: 'DELETE'
        });
        if (response.status === 204) {
            fetchNotes();
        }
    };


    useEffect(() => {
      fetchNotes();
    }, [])
    
    
    return (
            <div className="bg-zinc-700">
                <div className="flex justify-center mt-10 font-sans-Roboto">
                <div className="">
                    <h1 className="font-bold text-zinc-200">Notes:</h1>
                    <ul className="space-y-2 m-4 p-4">
                    {notes.map((note) => (
                        <li key={note.id}>
                        <div className="w-[500px] bg-zinc-200 rounded-md p-3">
                            <div className="font-bold">{note.title}:</div>
                            <br />
                            {note.body}
                        </div>
                        <button className="bg-zinc-500 p-1 m-1 rounded-full font-bold text-sm text-zinc-50 hover:bg-zinc-800 " onClick={() => deleteNote(note.id)}>Delete</button>
                        </li>
                    ))}
                    </ul>
                    <h2 className="font-bold text-zinc-200">Add New Note:</h2>
                    <div className="flex-col justify-center">
                        <label htmlFor="Title">
                            <p className="text-sm text-zinc-200 font-sans-Roboto font-semibold ml-3">Title:</p>
                            <input
                            className="m-2 bg-zinc-300 p-1 rounded-2xl"
                            type="text"
                            placeholder="Title"
                            value={newNote.title}
                            onChange={(e) => setNewNote({ ...newNote, title: e.target.value })}
                            />
                        </label>
                        <label htmlFor="Note">
                        <p className="text-sm text-zinc-200 font-sans-Roboto font-semibold ml-3">Note:</p>  
                        <input
                            className="m-2 bg-zinc-300 p-1 pl-2 rounded-2xl w-full h-40 align-top gap-2"
                            type="textarea"
                            placeholder="Add Note"
                            value={newNote.body}
                            onChange={(e) =>
                            setNewNote({ ...newNote, body: e.target.value })
                            }
                        />
                        </label>
                        </div>
                        <button className="bg-zinc-500 p-1 m-1 rounded-full font-bold text-sm text-zinc-50 hover:bg-zinc-800 " onClick={addNote}>Add Note:</button>                       
                    </div>
            </div>

        </div>
    )
}




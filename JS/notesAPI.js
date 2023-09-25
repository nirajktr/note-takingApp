export default class NotesAPI {
    // Retrieve all notes from local storage and sort them by the most recently updated
    static getAllNotes() {
        const notes = JSON.parse(localStorage.getItem("notesapp-notes") || "[]");

        // Sort notes by most recent
        return notes.sort((a, b) => {
            return new Date(a.updated) > new Date(b.updated) ? -1 : 1;
        });
    }

    // Save a new note or update an existing note
    static saveNote(noteToSave) {
        // Retrieve all notes from local storage
        const notes = NotesAPI.getAllNotes();
        
        // Find existing note with the same ID
        const existing = notes.find(note => note.id == noteToSave.id);

        // Edit/Update an existing note or create a new one
        if (existing) {
            // Update the existing note's title, body, and updated timestamp
            existing.title = noteToSave.title;
            existing.body = noteToSave.body;
            existing.updated = new Date().toISOString();
        } else {
            // Generate a random ID for a new note and set the updated timestamp
            noteToSave.id = Math.floor(Math.random() * 1000000);
            noteToSave.updated = new Date().toISOString();
            
            // Add the new note to the array of notes
            notes.push(noteToSave);
        }

        // Store the updated array of notes back in local storage
        localStorage.setItem("notesapp-notes", JSON.stringify(notes));
    }

    // Delete a note by its ID
    static deleteNote(id) {
        // Retrieve all notes from local storage
        const notes = NotesAPI.getAllNotes();
        
        // Filter out the note with the specified ID to remove it
        const newNotes = notes.filter(note => note.id != id);

        // Update the notes in local storage
        localStorage.setItem("notesapp-notes", JSON.stringify(newNotes));
    }
}

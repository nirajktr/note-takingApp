import NotesView from "./notesView.js";
import NotesAPI from "./NotesAPI.js";

// Main class
export default class App {
    constructor(root) {

        this.notes = [];
        this.activeNote = null;

        this.view = new NotesView(root, this._handlers());

        this._refreshNotes();
    }

    // Function to refresh the list of notes
    _refreshNotes() {    
        const notes = NotesAPI.getAllNotes();

        this._setNotes(notes);

        // If there are notes --> set active note to be first in list
            if (notes.length > 0) {
            this._setActiveNote(notes[0]);
        }
    }

    // Function to update the list of notes in the application state
    _setNotes(notes) {
        this.notes = notes;

        // Update UI to display the list of notes
        this.view.updateNoteList(notes);
        this.view.updateNotePreviewVisibility(notes.length > 0);
    }

    // Function to set the active note
    _setActiveNote(note) {
        this.activeNote = note;

        // Update the UI to display selected active note
        this.view.updateActiveNote(note);
    }

    // Function to define event handlers
    _handlers() {
        return {
            onNoteSelect: noteId => {
                // Find the selected note based on its ID
                const selectedNote = this.notes.find(note => note.id == noteId);

                // Set the selected note as the active note
                this._setActiveNote(selectedNote);
            },
            // Event handler for adding new note
            onNoteAdd: () => {
                const newNote = {
                    title: "Enter Title...",
                    body: "Take notes here..."
                };

                // Save the new note using the API and refresh the notes
                NotesAPI.saveNote(newNote);
                this._refreshNotes();
            },
            // Event handler for editing a note
            onNoteEdit: (title, body) => {
                NotesAPI.saveNote({
                    id: this.activeNote.id,
                    title,
                    body
                });

                // Refresh the notes
                this._refreshNotes();
            },
            // Event handler for deleting a note
            onNoteDelete: noteId => {

                // Delete the selected note using the API and refresh the notes
                NotesAPI.deleteNote(noteId);
                this._refreshNotes();
            },
        };
    }
}

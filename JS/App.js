import NotesView from "./NotesView.js";
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

}

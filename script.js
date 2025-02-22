class NoteForm extends HTMLElement {
  constructor() {
    super();
    this.innerHTML = `
      <form id="note-form">
        <h2>Tambah Catatan</h2>
        <input type="text" id="note-title" placeholder="Judul Catatan" required />
        <textarea id="note-body" placeholder="Isi Catatan" required></textarea>
        <button type="submit">Tambah Catatan</button>
      </form>
    `;
    this.querySelector("#note-form").addEventListener(
      "submit",
      this.addNote.bind(this)
    );
  }

  addNote(event) {
    event.preventDefault();
    const noteTitle = this.querySelector("#note-title").value;
    const noteBody = this.querySelector("#note-body").value;

    if (noteTitle && noteBody) {
      const newNote = {
        id: `notes-${Date.now()}`,
        title: noteTitle,
        body: noteBody,
        createdAt: new Date().toISOString(),
        archived: false,
      };
      notesData.push(newNote);
      document.dispatchEvent(new Event("notesUpdated"));
      this.querySelector("#note-form").reset();
    }
  }
}
customElements.define("note-form", NoteForm);

class NoteItem extends HTMLElement {
  set noteData(note) {
    this.innerHTML = `
      <div class="note-card">
        <h3>${note.title}</h3>
        <p>${note.body}</p>
        <button class="delete-btn">Hapus</button>
      </div>
    `;
    this.querySelector(".delete-btn").addEventListener("click", () =>
      this.deleteNote(note)
    );
  }

  deleteNote(note) {
    const index = notesData.indexOf(note);
    if (index > -1) {
      notesData.splice(index, 1);
      document.dispatchEvent(new Event("notesUpdated"));
    }
  }
}
customElements.define("note-item", NoteItem);

class NoteList extends HTMLElement {
  set notes(notes) {
    this.innerHTML = "";
    notes.forEach((note) => {
      const noteItem = document.createElement("note-item");
      noteItem.noteData = note;
      this.appendChild(noteItem);
    });
  }
}
customElements.define("note-list", NoteList);

document.addEventListener("DOMContentLoaded", function () {
  const notesContainer = document.getElementById("notes-container");

  function renderNotes() {
    const noteList = document.createElement("note-list");
    noteList.notes = notesData;
    notesContainer.innerHTML = "";
    notesContainer.appendChild(noteList);
  }

  document.addEventListener("notesUpdated", renderNotes);
  renderNotes();
});

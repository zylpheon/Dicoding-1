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
          <h3>${note.title}</h3>
          <p>${note.body}</p>
      `;
  }
}
customElements.define("note-item", NoteItem);

document.addEventListener("DOMContentLoaded", function () {
  const notesContainer = document.getElementById("notes-container");

  function renderNotes() {
    notesContainer.innerHTML = "";
    notesData.forEach((note) => {
      const noteItem = document.createElement("note-item");
      noteItem.noteData = note;
      notesContainer.appendChild(noteItem);
    });
  }

  document.addEventListener("notesUpdated", renderNotes);
  renderNotes();
});

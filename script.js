document.addEventListener("DOMContentLoaded", function () {
  const notesContainer = document.getElementById("notes-container");
  const noteForm = document.getElementById("note-form");
  const noteTitle = document.getElementById("note-title");
  const noteBody = document.getElementById("note-body");

  function renderNotes() {
    notesContainer.innerHTML = "";
    notesData.forEach((note) => {
      const noteCard = document.createElement("div");
      noteCard.classList.add("note-card");
      noteCard.innerHTML = `<h3>${note.title}</h3><p>${note.body}</p>`;
      notesContainer.appendChild(noteCard);
    });
  }

  noteForm.addEventListener("submit", function (event) {
    event.preventDefault();
    const newNote = {
      id: `notes-${Date.now()}`,
      title: noteTitle.value,
      body: noteBody.value,
      createdAt: new Date().toISOString(),
      archived: false,
    };
    notesData.push(newNote);
    renderNotes();
    noteForm.reset();
  });

  renderNotes();
});

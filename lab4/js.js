document.addEventListener('DOMContentLoaded', function () {
  const noteForm = document.getElementById('note-form');
  const notesContainer = document.getElementById('notes-container');

  noteForm.addEventListener('submit', function (event) {
    event.preventDefault();
    
    const title = document.getElementById('title').value;
    const content = document.getElementById('content').value;
    const color = document.getElementById('color').value;
    const pin = document.getElementById('pin').checked;
    const date = new Date().toLocaleString();

    const note = {
      title,
      content,
      color,
      pin,
      date
    };

    saveNoteToLocalStorage(note);
    displayNotes();
    noteForm.reset();
  });

  function saveNoteToLocalStorage(note) {
    let notes = JSON.parse(localStorage.getItem('notes')) || [];
    notes.push(note);
    localStorage.setItem('notes', JSON.stringify(notes));
  }

  function displayNotes() {
    notesContainer.innerHTML = '';
    const notes = JSON.parse(localStorage.getItem('notes')) || [];

    notes.forEach(function (note, index) {
      const noteElement = document.createElement('div');
      noteElement.classList.add('note');
      if (note.pin) {
        noteElement.classList.add('pinned');
      }
      noteElement.style.backgroundColor = note.color;
      noteElement.innerHTML = `
        <h3>${note.title}</h3>
        <p>${note.content}</p>
        <p>${note.date}</p>
        <button onclick="deleteNote(${index})">Usuń</button>
      `;
      notesContainer.appendChild(noteElement);
    });
  }

  window.deleteNote = function (index) {
    let notes = JSON.parse(localStorage.getItem('notes')) || [];
    notes.splice(index, 1);
    localStorage.setItem('notes', JSON.stringify(notes));
    displayNotes();
  };

  displayNotes();
});

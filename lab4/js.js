document.addEventListener('DOMContentLoaded', function () {
  // Pobieramy referencje do formularza do dodawania notatek i kontenera na notatki
  const noteForm = document.getElementById('note-form');
  const notesContainer = document.getElementById('notes-container');

  // Nasłuchujemy zdarzenia przesyłania formularza
  noteForm.addEventListener('submit', function (event) {
    // Zapobiegamy domyślnej akcji przesyłania formularza
    event.preventDefault();
    
    // Pobieramy wartości z pól formularza
    const title = document.getElementById('title').value;
    const content = document.getElementById('content').value;
    const color = document.getElementById('color').value;
    const pin = document.getElementById('pin').checked;
    const date = new Date().toLocaleString();

    // Tworzymy obiekt reprezentujący notatkę
    const note = {
      title,
      content,
      color,
      pin,
      date
    };

    // Zapisujemy notatkę do local storage
    saveNoteToLocalStorage(note);
    // Wyświetlamy notatki
    displayNotes();
    // Czyścimy formularz
    noteForm.reset();
  });

  // Funkcja zapisująca notatkę do local storage
  function saveNoteToLocalStorage(note) {
    let notes = JSON.parse(localStorage.getItem('notes')) || [];
    notes.push(note);
    localStorage.setItem('notes', JSON.stringify(notes));
  }

  // Funkcja wyświetlająca notatki
  function displayNotes() {
    // Czyścimy kontener na notatki
    notesContainer.innerHTML = '';
    // Pobieramy notatki z local storage
    const notes = JSON.parse(localStorage.getItem('notes')) || [];

    // Iterujemy po notatkach i tworzymy elementy HTML dla każdej z nich
    notes.forEach(function (note, index) {
      const noteElement = document.createElement('div');
      noteElement.classList.add('note');
      // Jeśli notatka jest przypięta, dodajemy odpowiednią klasę CSS
      if (note.pin) {
        noteElement.classList.add('pinned');
      }
      // Ustawiamy kolor tła notatki
      noteElement.style.backgroundColor = note.color;
      // Wypełniamy treść notatki
      noteElement.innerHTML = `
        <h3>${note.title}</h3>
        <p>${note.content}</p>
        <p>${note.date}</p>
        <button onclick="deleteNote(${index})">Usuń</button>
      `;
      // Dodajemy notatkę do kontenera
      notesContainer.appendChild(noteElement);
    });
  }

  // Funkcja globalna do usuwania notatek
  window.deleteNote = function (index) {
    let notes = JSON.parse(localStorage.getItem('notes')) || [];
    // Usuwamy notatkę o danym indeksie
    notes.splice(index, 1);
    // Zapisujemy zmienione notatki w local storage
    localStorage.setItem('notes', JSON.stringify(notes));
    // Ponownie wyświetlamy notatki
    displayNotes();
  };

  // Wyświetlamy notatki po załadowaniu strony
  displayNotes();
});

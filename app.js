import "./src/script/component/header.js";
import "./src/script/component/noteheader.js";
import "./src/script/component/sidebar.js";
import "./src/script/component/footer.js";

// Definisikan variabel months di luar dari fungsi createNoteElement
const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

document.addEventListener("DOMContentLoaded", () => {
  eventListeners();
  displayNotes();
  displayArchivedNotes();
});


const activeNotesList = document.getElementById('activeNotesList');
const archivedNotesList = document.getElementById('archivedNotesList');

function Note(title, body) {
  this.title = title;
  this.body = body;
}

// Loader
const loader = document.querySelector("#loading");
// show loading
function displayLoading(){
  loader.classList.add("display");
  setTimeout(() => {
    loader.classList.remove("display");
  }, 1500);
}
// hide loading
function hideLoading(){
  loader.classList.remove("display");
}

//FETCH 
async function fetchData(){
  try {
      const response = await fetch('https://notes-api.dicoding.dev/v2/notes');
      const data = await response.json();
      displayLoading();
      console.log(data.data);
      return data.data;
  } catch (error) {
      alert('Gagal Mengambil data note!');
      console.error('Error:', error);
  }
}

async function fetchArchivedData(){
  try {
      const response = await fetch('https://notes-api.dicoding.dev/v2/notes/archived');
      const data = await response.json();
      displayLoading();
      return data.data;
  } catch (error) {
      alert('Gagal Mengambil data note!');
      console.error('Error:', error);
  }
}

async function deleteNote(id){
  try {
      const response = await fetch('https://notes-api.dicoding.dev/v2/notes/'+id, {
          method : 'DELETE'
      });
      const data = await response.json();
      displayLoading();
      console.log(data);
      return data;
  } catch (error) {
    alert('Gagal Menghapus note!');
      console.error('Error:', error);
  }
}

async function archiveNote(id){
  try {
      const response = await fetch('https://notes-api.dicoding.dev/v2/notes/'+id+'/archive', {
          method : 'POST'
      });
      const data = await response.json();
      displayLoading();
      console.log(data);
      return data;
  } catch (error) {
      alert('Gagal Mengarsipkan note!');
      console.error('Error:', error);
  }
}

async function unarchiveNote(id){
  try {
      const response = await fetch('https://notes-api.dicoding.dev/v2/notes/'+id+'/unarchive', {
          method : 'POST'
      });
      const data = await response.json();
      displayLoading();
      console.log(data);
      return data;
  } catch (error) {
    alert('Gagal Mengunarsip note!');
      console.error('Error:', error);
  }
}

async function postData(data) {
  try {
    const response = await fetch("https://notes-api.dicoding.dev/v2/notes", {
      method: "POST", // or 'PUT'
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const result = await response.json();
    displayLoading();
    if(!alert('Berhasil Menambah data note!')){window.location.reload()};
    console.log("Success:", result);
  } catch (error) {
    console.error("Error:", error);
  }
}


// all event listeners
function eventListeners() {
  document
    .getElementById("add-note-klik")
    .addEventListener("click", () => {
      const noteTitle = document.getElementById("catatan-title");
      const noteContent = document.getElementById("catatan-content");
      
      if (validateInput(noteTitle, noteContent)) {
        addNewNote();
      }
    });

  activeNotesList.addEventListener("click", deleteNoteEvent);
  activeNotesList.addEventListener("click", onArchive)
  archivedNotesList.addEventListener("click", deleteNoteEvent);
  archivedNotesList.addEventListener("click", onActive);
}

// add a new note to the list
function addNewNote() {
  const noteTitle = document.getElementById("catatan-title");
  const noteContent = document.getElementById("catatan-content");

  const newNote = new Note(
    noteTitle.value,
    noteContent.value,
  );

  postData(newNote); // Post ke API
  //notesData.push(newNote); // Menambahkan catatan baru ke array notesData
  //updateLocalStorage(); // Memperbarui penyimpanan lokal dengan data terbaru
  //createNoteElement(newNote); // Membuat elemen catatan dalam DOM
  noteTitle.value = "";
  noteContent.value = "";
}

// input validation with error messages
function validateInput(title, content) {
  const titleValue = title.value.trim();
  const contentValue = content.value.trim();

  if (titleValue !== "" && contentValue !== "") {
    return true;
  } else {
    if (titleValue === "") {
      title.classList.add("warning");
      title.nextElementSibling.textContent = "Judul tidak boleh kosong";
    }
    if (contentValue === "") {
      content.classList.add("warning");
      content.nextElementSibling.textContent = "Isi catatan tidak boleh kosong";
    }
    return false; // Menandakan bahwa input tidak valid
  }

  setTimeout(() => {
    title.classList.remove("warning");
    content.classList.remove("warning");
    title.nextElementSibling.textContent = "";
    content.nextElementSibling.textContent = "";
  }, 1500);
}

// create a new note div
function createNoteElement(noteItem) {
  const div = document.createElement("div");
  div.classList.add("catatan-item");
  div.setAttribute("data-id", noteItem.id);

  // Mengonversi tanggal ke dalam format yang diinginkan
  const createdAtDate = new Date(noteItem.createdAt);
  const formattedDate = `${createdAtDate.getDate()} ${
    months[createdAtDate.getMonth()]
  } ${createdAtDate.getFullYear()}`;

  div.innerHTML = `
    <h3>${noteItem.title}</h3>
    <p>${noteItem.body}</p>
    <div class="date">${formattedDate}</div>
    <button type="button" class="klik delete-note-klik">
        <span><i class="fas fa-trash"></i></span>
        Hapus
    </button>
    <button type="button" class="klik archive-note-klik">
        Archive
    </button>
  `;

  activeNotesList.appendChild(div);
}

// Create Element Archive Note
function createArchiveNoteElement(noteItem) {
  const div = document.createElement("div");
  div.classList.add("catatan-item");
  div.setAttribute("data-id", noteItem.id);

  // Mengonversi tanggal ke dalam format yang diinginkan
  const createdAtDate = new Date(noteItem.createdAt);
  const formattedDate = `${createdAtDate.getDate()} ${
    months[createdAtDate.getMonth()]
  } ${createdAtDate.getFullYear()}`;

  div.innerHTML = `
    <h3>${noteItem.title}</h3>
    <p>${noteItem.body}</p>
    <div class="date">${formattedDate}</div>
    <button type="button" class="klik delete-note-klik">
        <span><i class="fas fa-trash"></i></span>
        Hapus
    </button>
    <button type="button" class="klik unarchive-note-klik">
        Unarchive
    </button>
  `;

  archivedNotesList.appendChild(div);
}

// display all the notes from the local storage
async function displayNotes() {
  let notes = fetchData();
  const [dataNotes] = await Promise.all([notes]); 
  Object.values(dataNotes).forEach((item) => {
    createNoteElement(item);
  });
}

async function displayArchivedNotes(){
  let archivedNotes = fetchArchivedData();
  const [dataNotesArchived] = await Promise.all([archivedNotes]); 
  Object.values(dataNotesArchived).forEach((item) => {
    createArchiveNoteElement(item);
  });
}

// delete a note
function deleteNoteEvent(e) {
  if (e.target.classList.contains("delete-note-klik")) {
    const noteElement = e.target.closest(".catatan-item");
    if (noteElement) {
      const noteId = noteElement.dataset.id;
      //deleteNoteById(noteId);
      deleteNote(noteId);
      noteElement.remove();
    }
  }
}

// Menghapus catatan dari array notesData berdasarkan ID
function deleteNoteById(id) {
  notesData = notesData.filter((note) => note.id !== id);
  updateLocalStorage(); // Memperbarui penyimpanan lokal setelah menghapus catatan
}

// Mengupdate penyimpanan lokal dengan data terbaru
function updateLocalStorage() {
  localStorage.setItem("notes", JSON.stringify(notesData));
}

// Mengarsip
function onArchive(e) {
  if (e.target.classList.contains("archive-note-klik")) {
    const noteElement = e.target.closest(".catatan-item");
    if (noteElement) {
      const noteId = noteElement.dataset.id;
      archiveNote(noteId);
      noteElement.remove();
      if(!alert("Sukses Mengarsipkan Notes")){window.location.reload();};
    }
  }
}

// Meng-Unarsip
function onActive(e) {
  if (e.target.classList.contains("unarchive-note-klik")) {
    const noteElement = e.target.closest(".catatan-item");
    if (noteElement) {
      const noteId = noteElement.dataset.id;
      unarchiveNote(noteId);
      noteElement.remove();
      if(!alert("Sukses Mengunarsipkan Notes")){window.location.reload()};
    }
  }
}

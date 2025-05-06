import localforage from "localforage";
import { nanoid } from 'nanoid';
import { stickerColors } from "./styles/stickerColors";

export async function getNotes() {
	await someNetwork();
	let notes = await localforage.getItem("notes");
	if (!notes) notes = [];
	return notes;
}

export async function createNote(dates) {
	await someNetwork();
	console.log(dates.newSticker);
	let id = nanoid(5);
	let note = {
		id,
		note: dates.newSticker,
		color: stickerColors[Math.floor(Math.random() * stickerColors.length)],
	};
	let notes = await getNotes();
	notes.unshift(note);
	await setNotes(notes);
	return note;
}

function setNotes(notes) {
	return localforage.setItem('notes', notes);
}

export async function updateNote(id, newText) {
  const notes = await getNotes();
  const updatedNotes = notes.map(note =>
    note.id === id ? { ...note, note: newText } : note
  );
  await localforage.setItem('notes', updatedNotes);
  return updatedNotes.find(note => note.id === id);
};

export async function  deleteNote(id) {
  const notes = await getNotes();
  const filteredNotes = notes.filter(note => note.id !== id);
  await localforage.setItem('notes', filteredNotes);
};

let someCache = {};

async function someNetwork(key) {
	if (!key) {
		someCache = {};
	}

	if (someCache[key]) {
		return;
	}

	someCache[key] = true;

	return new Promise((res) => {
		setTimeout(res, Math.random() * 700);
	});
}

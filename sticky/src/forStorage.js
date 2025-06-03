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

	const id = nanoid(3);

	const stickerWidth = 250;
	const stickerHeight = 250;
	const existingStickers = await getNotes();

	const maxZIndex = Object.values(existingStickers).reduce(
		(max, sticker) => Math.max(max, sticker.zIndex || 1),
		1
	);

	let centerX, centerY;

	centerX = window.innerWidth / 2 - stickerWidth / 2 + window.scrollX;
	centerY = window.innerHeight / 2 - stickerHeight / 2 + window.scrollY;

	const randomOffset = () => Math.floor(Math.random() * 100) - 50;

	const newSticker = {
		[id]: {
			top: centerY + randomOffset(),
			left: centerX + randomOffset(),
			title: dates.newSticker,
			zIndex: maxZIndex + 1,
			color: stickerColors[Math.floor(Math.random() * stickerColors.length)],
		},
	};

	const updatedStickers = { ...newSticker, ...existingStickers };
	await setNotes(updatedStickers);

	return newSticker;
}

function setNotes(notes) {
	return localforage.setItem('notes', notes);
}

export async function updateNote(id, updatedSticker) {
  const notes = await getNotes();
	console.log(updatedSticker)
  const updatedNotes = {
    ...notes,
    [id]: {
      ...notes[id],
      ...updatedSticker
    }
  };
  await localforage.setItem('notes', updatedNotes);
  return updatedNotes[id];
}

export async function updateTextNote(id, newText) {
	const notes = await getNotes();
	console.log(newText)
  const updatedNotes = {
    ...notes,
    [id]: {
      ...notes[id],
      title: newText,
    }
  };
  await localforage.setItem('notes', updatedNotes);
  return updatedNotes[id];
}

export async function  deleteNote(id) {
  const notes = await getNotes();
	delete notes[id]
	await localforage.setItem('notes', notes);
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

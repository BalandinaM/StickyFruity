import localforage from "localforage";
import { nanoid } from 'nanoid';
import { stickerColors } from "./styles/stickerColors";

export async function getNotes() {
	await someNetwork();
	let notes = await localforage.getItem("notes");
	if (!notes) notes = [];
	return notes;
}

// export async function createNote(dates) {
// 	await someNetwork();
// 	console.log(dates.newSticker);
// 	let id = nanoid(5);
// 	let note = {
// 		id,
// 		note: dates.newSticker,
// 		color: stickerColors[Math.floor(Math.random() * stickerColors.length)],
// 	};
// 	let notes = await getNotes();
// 	notes.unshift(note);
// 	await setNotes(notes);
// 	return note;
// }

export async function createNote(dates, containerSize = null, currentMaxZIndex = 1) {
  await someNetwork(); // Ваша сетевая функция, если нужна

  const id = nanoid(3);

	//динамическое значение должно быть!!!!
  const stickerWidth = 250; // Ширина стикера (уточните ваше значение)
  const stickerHeight = 250; // Высота стикера (уточните ваше значение)

  // 1. Вычисляем центр области
  let centerX, centerY;

  if (containerSize) {
    // Если передан размер контейнера (например, {width: 1000, height: 800})
    centerX = containerSize.width / 2 - stickerWidth / 2;
    centerY = containerSize.height / 2 - stickerHeight / 2;
  } else {
    // Если используется вся страница (viewport)
    centerX = window.innerWidth / 2 - stickerWidth / 2 + window.scrollX;
    centerY = window.innerHeight / 2 - stickerHeight / 2 + window.scrollY;
  }

  // 2. Добавляем небольшое случайное смещение (+/- 50px)
  //    чтобы новые стикеры не перекрывались
  const randomOffset = () => Math.floor(Math.random() * 100) - 50;

  const newSticker = {
    [id]: {
      top: centerY + randomOffset(),
      left: centerX + randomOffset(),
      title: dates || 'New sticker',
      zIndex: currentMaxZIndex + 1,
      color: stickerColors[Math.floor(Math.random() * stickerColors.length)],
      width: stickerWidth, // Добавляем размеры, если нужно
      height: stickerHeight
    }
  };

  // 3. Обновляем хранилище
  const existingStickers = await getNotes();
  const updatedStickers = { ...newSticker, ...existingStickers };
  await setNotes(updatedStickers);

  return newSticker;
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

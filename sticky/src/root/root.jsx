import Footer from "../footer/footer";
import Header from "../header/header";
import StickerBoard from "../stickerBoard/stickerBoard";
import { getNotes, createNote, updateNote, deleteNote } from './../forStorage';
import { useLoaderData } from "react-router-dom";

export async function loader() {
	const notes = await getNotes();
	return { notes };
}

export async function action({ request }) {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);

  try {
    switch (data._action) {
      case "create": {
				const newNote = await createNote(data);
        console.log("Новый стикер создан:", newNote);
        return { success: true, note: newNote };
			}

      case "update": {
        const updatedNote = await updateNote(data.id, data.note);
        console.log("Стикер обновлён:", updatedNote);
        return { success: true, note: updatedNote };
			}
      case "delete": {
        await deleteNote(data.id);
        console.log("Стикер удалён, ID:", data.id);
        return { success: true };
			}
      default:
        console.warn("Неизвестное действие:", data._action);
        return { success: false, error: "Unknown action" };
    }
  } catch (error) {
    console.error("Ошибка в action:", error);
    return { success: false, error: error.message };
  }
}

const Root = () => {
	const { notes } = useLoaderData();
	//console.log('Загружены данные из локального хранилища', notes);
  return (
    <>
			<Header />
			<StickerBoard arrNotes={notes}/>
			<Footer />
    </>
  )
}

export default Root;

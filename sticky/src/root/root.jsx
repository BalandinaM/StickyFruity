import Footer from "../footer/footer";
import Header from "../header/header";
import StickerBoardContainer from "../stickerBoard/stickerBoardContainer";
import { getNotes, createNote, deleteNote, updateTextNote } from './../forStorage';
import { useLoaderData } from "react-router-dom";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "../../node_modules/react-dnd-html5-backend/dist/index";

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
				//console.log(data.note)
				const updatedNote = await updateTextNote(data.id, data.title);
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
			<DndProvider backend={HTML5Backend}>
				<StickerBoardContainer arrNotes={notes} />
			</DndProvider>
			<Footer />
		</>
	);
}

export default Root;


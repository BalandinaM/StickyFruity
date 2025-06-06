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
        return { success: true, note: newNote };
			}
      case "update": {
				const updatedNote = await updateTextNote(data.id, data.title);
        return { success: true, note: updatedNote };
			}
      case "delete": {
        await deleteNote(data.id);
        return { success: true };
			}
      default:
        return { success: false, error: "Unknown action" };
    }
  } catch (error) {
    console.error("Ошибка в action:", error);
    return { success: false, error: error.message };
  }
}

const Root = () => {
	const { notes } = useLoaderData();
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

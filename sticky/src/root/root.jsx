import Footer from "../footer/footer";
import Header from "../header/header";
import StickerBoard from "../stickerBoard/stickerBoard";
import { getNotes, createNote } from './../forStorage';
import { useLoaderData } from "react-router-dom";

export async function loader() {
	const notes = await getNotes();
	return { notes };
}

export async function action({request}) {
	const formData = await request.formData();
	const dates = Object.fromEntries(formData);
	const note = await createNote(dates);
	console.log("Данные сохранены:", note);
	return { success: true, note };
}

const Root = () => {
	const { notes } = useLoaderData();
	console.log('Загружены данные из локального хранилища', notes);
  return (
    <>
			<Header />
			<StickerBoard arrNotes={notes}/>
			<Footer />
    </>
  )
}

export default Root;

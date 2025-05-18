import styles from "./stickerBoard.module.scss";
import { useState, useEffect, useRef } from "react";
import NewSticker from "../newSticker/newSticker";
import { useActionData } from "react-router-dom";
import StickerEdit from "../stickerEdit/stickerEdit";
import Sticker from "../sticker/sticker";
import { DNDStickerBoard } from './DNDstickerBoard';
import { EmptyStickerBoard } from "../emptyStickerBoard/emptyStickerBoard";

//сделать эффект при наведении на стикеры, чтобы было понятно что они кликабельны

const StickerBoardContainer = ({ arrNotes }) => {
	console.log("В StickerBoard пришло", typeof(arrNotes));
	const [createNewSticker, setCreateNewSticker] = useState(false);
	const actionData = useActionData(); // Данные, возвращённые из action
	//arrNotes.map((item) => console.log(item));
	const hasNotes = arrNotes && Object.keys(arrNotes).length > 0;
	const [activeSticker, setActiveSticker] = useState(null);

	// Закрываем окно, если action завершился успешно
	//эта же функция в newSticker, вероятно ту она не нужна
	// useEffect(() => {
	// 	if (actionData?.success) {
	// 		setCreateNewSticker(false);
	// 	}
	// }, [actionData, setCreateNewSticker]);

	const handleClick = (item) => {
		setActiveSticker(item.id);
		console.log(`Клик по стикеру ${item.id}`);
	};

	return (
		<main className={styles.main}>
			{hasNotes ? (
				<DNDStickerBoard setCreateNewSticker={setCreateNewSticker} arrNotes={arrNotes} ></DNDStickerBoard>
			) : (
				<EmptyStickerBoard setCreateNewSticker={setCreateNewSticker}/>
			)}

			{createNewSticker && (
				<NewSticker setCreateNewSticker={setCreateNewSticker} />
			)}
		</main>
	);
};

export default StickerBoardContainer;

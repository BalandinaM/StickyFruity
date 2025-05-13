import styles from "./stickerBoard.module.scss";
import { useState, useEffect } from "react";
import NewSticker from "../newSticker/newSticker";
import { useActionData } from "react-router-dom";
import StickerEdit from "../stickerEdit/stickerEdit";
import Sticker from "../sticker/sticker";

//сделать эффект при наведении на стикеры, чтобы было понятно что они кликабельны

const StickerBoard = ({ arrNotes }) => {
	console.log("В StickerBoard пришло", arrNotes);
	const [createNewSticker, setCreateNewSticker] = useState(false);
	const actionData = useActionData(); // Данные, возвращённые из action
	//arrNotes.map((item) => console.log(item));
	const hasNotes = arrNotes && arrNotes.length > 0;
	const [activeSticker, setActiveSticker] = useState(null);

	// Закрываем окно, если action завершился успешно
	useEffect(() => {
		if (actionData?.success) {
			setCreateNewSticker(false);
		}
	}, [actionData, setCreateNewSticker]);

	const handleClick = (item) => {
		setActiveSticker(item.id);
		console.log(`Клик по стикеру ${item.id}`);
	};

	return (
		<main className={styles.main}>
			{hasNotes ? (
				<>
					<ul className={styles.listNotes}>
						{arrNotes.map((item) =>
							activeSticker === item.id ? (
								<StickerEdit key={item.id} item={item} onClose={() => setActiveSticker(null)}/>
							) : (
								<Sticker key={item.id} item={item} handleClick={handleClick}></Sticker>
							)
						)}
					</ul>
					<button
						className={`${styles.commonButton} ${styles.circleButton}`}
						onClick={() => setCreateNewSticker(true)}
						type="button"
					/>
				</>
			) : (
				<>
					<p className={styles.text}>
						Вы еще не добавили ни одного стикера. Сделайте это сейчас!
					</p>
					<button
						className={styles.commonButton}
						onClick={() => setCreateNewSticker(true)}
						type="button"
					>
						Новый стикер
					</button>
				</>
			)}

			{createNewSticker && (
				<NewSticker setCreateNewSticker={setCreateNewSticker} />
			)}
		</main>
	);
};

export default StickerBoard;

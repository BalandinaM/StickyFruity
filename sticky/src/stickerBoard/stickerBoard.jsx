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

//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
// для более производительного расчета z-index!!!!!!!!
// предполагается что дожидаемся ответа от сервера,!!!!
// меняем maxZIndexRef.current на newSticker.zIndex,!!!
// и устанавливаем новый стейт!!!!!!!!!!!!!!!!!!!!!!!!!!!
//setStickers(prev => ({ ...newSticker, ...prev }));!!!!!!!!!!!!!!!!!!!!!!
// вероятно это можно запихнуть в юзеэффект который ниже у меня в коде.!!!
//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

// 	const maxZIndexRef = useRef(1);

// // В компоненте:
// const handleCreateSticker = async () => {
//   const newSticker = await createSticker(
//     "Текст",
//     containerSize,
//     maxZIndexRef.current
//   );
//   maxZIndexRef.current = newSticker.zIndex;
//   setStickers(prev => ({ ...newSticker, ...prev }));
// };

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

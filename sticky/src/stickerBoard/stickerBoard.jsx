import styles from "./stickerBoard.module.scss";
import { useState, useEffect } from "react";
import NewSticker from "../newSticker/newSticker";
import { useActionData } from "react-router-dom";

const StickerBoard = ({ arrNotes }) => {
	//два состояния,
	// 1.если стики есть в локальном хранилище - показываем доску
	//  со стиками и кнопку трансформируем и переносим вниз,
	// а позиционировать абсолютно, относительно экрана
	// 2.если нет записей - текст и кнопку
	console.log("В StickerBoard пришло", arrNotes);
	const [createNewSticker, setCreateNewSticker] = useState(false);
	const actionData = useActionData(); // Данные, возвращённые из action
	arrNotes.map((item) => console.log(item));
	const hasNotes = arrNotes && arrNotes.length > 0;

	// Закрываем окно, если action завершился успешно
	useEffect(() => {
		if (actionData?.success) {
			setCreateNewSticker(false);
		}
	}, [actionData, setCreateNewSticker]);

	return (
		<main className={styles.main}>
			{hasNotes ? (
				<>
					<ul className={styles.listNotes}>
						{arrNotes.map((item) => (
							<li
								key={item.id}
								className={styles.note}
								style={{ "--note-color": item.color }}
							>
								{item.note}
							</li>
						))}
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

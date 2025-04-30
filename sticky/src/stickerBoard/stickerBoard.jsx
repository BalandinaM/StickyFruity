import styles from "./stickerBoard.module.scss";
import { useState, useEffect } from "react";
import NewSticker from "../newSticker/newSticker";
import { useActionData } from "react-router-dom";

const StickerBoard = () => {
	//два состояния,
	// 1.если стики есть в локальном хранилище - показываем доску
	//  со стиками и кнопку трансформируем и переносим вниз,
	// а позиционировать абсолютно, относительно экрана
	// 2.если нет записей - текст и кнопку
	const [createNewSticker, setCreateNewSticker] = useState(false);
	console.log("Текущее состояние createNewSticker:", createNewSticker);
	const actionData = useActionData(); // Данные, возвращённые из action

	// Закрываем окно, если action завершился успешно
	useEffect(() => {
		if (actionData?.success) {
			setCreateNewSticker(false);
		}
	}, [actionData, setCreateNewSticker]);


	return (
		<main className={styles.main}>
			<p className={styles.text}>Вы еще не добавили ни одного стикера. Сделайте это сейчас!</p>
			<button className={`${styles.commonButton} ${styles.rectangleButton}`} onClick={() => setCreateNewSticker(true)} type="button">Новый стикер</button>
			{/* если записи в хранилище есть */}
			{/* <ul>
				<li>стикер1</li>
				<li>стикер2</li>
				<li>стикер3</li>
			</ul> */}
			{createNewSticker ? <NewSticker setCreateNewSticker={setCreateNewSticker}/> : null}
		</main>
	);
};

export default StickerBoard;

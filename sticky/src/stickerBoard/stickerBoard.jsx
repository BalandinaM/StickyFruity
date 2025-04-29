import { Form } from "react-router-dom";
import styles from "./stickerBoard.module.scss";
import ButtonAddSticker from "../components/buttonAddSticker/buttonAddSticker";
import { useState } from "react";
import NewSticker from "../newSticker/newSticker";

const StickerBoard = () => {
	//два состояния,
	// 1.если стики есть в локальном хранилище - показываем доску
	//  со стиками и кнопку трансформируем и переносим вниз,
	// а позиционировать абсолютно, относительно экрана
	// 2.если нет записей - текст и кнопку
	const [createNewSticker, setCreateNewSticker] = useState(false);

	const handleClickAddSticker = () => {
		console.log("Добавить стикер!");
		setCreateNewSticker(true);
	};

	return (
		<main className={styles.main}>
			<p className={styles.text}>Вы еще не добавили ни одного стикера. Сделайте это сейчас!</p>
			{/* <Form method='post'><button type='submit'>ADD STICKER</button></Form> */}
			<ButtonAddSticker handleClickAddSticker={handleClickAddSticker} />
			{/* если записи в хранилище есть */}
			{/* <ul>
				<li>стикер1</li>
				<li>стикер2</li>
				<li>стикер3</li>
			</ul> */}
			{createNewSticker ? <NewSticker /> : null}
		</main>
	);
};

export default StickerBoard;

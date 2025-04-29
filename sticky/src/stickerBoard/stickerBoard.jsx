import { Form } from 'react-router-dom';
import styles from './stickerBoard.module.scss';

const StickerBoard = () => {
	//два состояния,
	// 1.если стики есть в локальном хранилище - показываем доску
	//  со стиками и кнопку трансформируем и переносим вниз,
	// а позиционировать абсолютно, относительно экрана
	// 2.если нет записей - текст и кнопку
	return (
		<main>
			<p>Вы еще не добавили ни одного стикера. Сделайте это сейчас!</p>
			<Form method='post'><button type='submit'>ADD STICKER</button></Form>
			{/* если записи в хранилище есть */}
			<ul>
				<li>стикер1</li>
				<li>стикер2</li>
				<li>стикер3</li>
			</ul>

		</main>
	)
}

export default StickerBoard

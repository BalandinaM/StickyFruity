import styles from './emptyStickerBoard.module.scss'

export const EmptyStickerBoard = ({setCreateNewSticker}) => {
	return (
		<div>
			<h2 className={styles.title}>Фруктовые стикеры для самых вкусных идей!</h2>
			<p className={styles.text}>Нажми на  кнопку «Новый стикер» — и на холсте появится первая сочная заметка!</p>
			<ul>
				<li className={`${styles.text} ${styles.item}`}>Тащи за любой край — перемещай стикер, куда хочешь</li>
				<li className={`${styles.text} ${styles.item}`}>Кликай на текст — редактируй сколько угодно</li>
				<li className={`${styles.text} ${styles.item}`}>Сбрасывай стикеры друг на друга — собирай в аппетитные стопки</li>
				<li className={`${styles.text} ${styles.item}`}>Нажимай на корзинку — удаляй, если идея созрела</li>
			</ul>
			<p className={styles.text}>Цвета выбираются рандомно — как фрукты в летнем саду!</p>
			<p className={styles.text}>Давай вырастим здесь целый витаминный сад заметок!</p>
			<button
				className={styles.commonButton}
				onClick={() => setCreateNewSticker(true)}
				type="button"
			>
				Новый стикер
			</button>
		</div>
	);
};

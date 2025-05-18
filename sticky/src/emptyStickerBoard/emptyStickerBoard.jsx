import styles from './emptyStickerBoard.module.scss'

export const EmptyStickerBoard = ({setCreateNewSticker}) => {
	return (
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
	);
};

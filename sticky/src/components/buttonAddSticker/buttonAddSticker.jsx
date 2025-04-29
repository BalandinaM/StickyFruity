import styles from './buttonAddSticker.module.scss';

const ButtonAddSticker = ({handleClickAddSticker}) => {
	return (
		<button className={`${styles.commonButton} ${styles.rectangleButton}`} onClick={handleClickAddSticker} type="button">Новый стикер</button>
	)
}

export default ButtonAddSticker;

import styles from './stickerButtin.module.scss';

const StickerButton = ({type, icon, handleClick}) => {
	return (
		<button className={styles.button} type={type} onClick={handleClick}>{icon}</button>
	)
}

export default StickerButton;

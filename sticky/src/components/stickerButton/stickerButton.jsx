import styles from './stickerButtin.module.scss';

const StickerButton = ({type, icon, handleClick, customClass = ''}) => {
	return (
		<button className={`styles.button ${customClass}`} type={type} onClick={handleClick}>{icon}</button>
	)
}

export default StickerButton;

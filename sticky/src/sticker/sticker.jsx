import styles from './sticker.module.scss'

const Sticker = ({item, handleClick}) => {
	return (
		<li
			key={item.id}
			className={styles.note}
			style={{ "--note-color": item.color }}
			onClick={() => handleClick(item)}
		>
			{item.note}
		</li>
	);
};

export default Sticker;

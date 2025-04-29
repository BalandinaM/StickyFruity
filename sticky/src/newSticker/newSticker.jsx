import { Form } from "react-router-dom"
import styles from './newSticker.module.scss';
import StickerButton from "../components/stickerButton/stickerButton";
import SaveStickerIcon from "../components/saveStickerIcon/saveStickerIcon";
import DeleteStickerIcon from "../components/deleteStickerIcon/deleteStikerIcon";


const NewSticker = () => {
	const handleSaveClick = () => {
		console.log('Сохранить изменения!')
	}

	const handleDeleteClick = () => {
		console.log('Удалить все нахрен!')
	}

	return (
		<div className={styles.overlay} role="dialog"
		aria-modal="true"
		aria-labelledby="sticker-heading">
			<Form>
				<div className={styles.container}>
				<h2 id="sticker-heading" className={styles.visually_hidden}>Новый стикер</h2>
					<textarea name="newSticker" id="newSticker" placeholder="Введите текст..."></textarea>
					<div className={styles.wrapButton}>
						<StickerButton type={"submit"} icon={<SaveStickerIcon />} handleClick={handleSaveClick}/>
						<StickerButton type={"reset"} icon={<DeleteStickerIcon />} handleClick={handleDeleteClick}/>
					</div>
				</div>
			</Form>
		</div>
	)
}

export default NewSticker;

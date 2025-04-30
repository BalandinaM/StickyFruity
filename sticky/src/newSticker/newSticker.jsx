import { Form } from "react-router-dom";
import styles from "./newSticker.module.scss";
import StickerButton from "../components/stickerButton/stickerButton";
import SaveStickerIcon from "../components/saveStickerIcon/saveStickerIcon";
import DeleteStickerIcon from "../components/deleteStickerIcon/deleteStikerIcon";
import { useState } from "react";

const NewSticker = ({ setCreateNewSticker }) => {
	const [value, setValue] = useState("");

	const handleDeleteClick = () => {
		console.log("Удалить все нахрен!");
		setValue("");
		setCreateNewSticker(false);
	};

	return (
		<div
			className={styles.overlay}
			role="dialog"
			aria-modal="true"
			aria-labelledby="sticker-heading"
		>
			<Form method="post">
				<div className={styles.container}>
					<h2 id="sticker-heading" className={styles.visually_hidden}>
						Новый стикер
					</h2>
					<textarea
						name="newSticker"
						id="newSticker"
						onChange={(event) => setValue(event.target.value)}
						placeholder="Введите текст..."
					></textarea>
					<div className={styles.wrapButton}>
						<StickerButton
							type={"reset"}
							icon={<DeleteStickerIcon />}
							handleClick={handleDeleteClick}
						/>
						<StickerButton
							type={"submit"}
							icon={<SaveStickerIcon />}
							value={value}
						/>
					</div>
				</div>
			</Form>
		</div>
	);
};

export default NewSticker;

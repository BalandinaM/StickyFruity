//import { Form } from "react-router-dom";
import styles from "./newSticker.module.scss";
import StickerButton from "../components/stickerButton/stickerButton";
import SaveStickerIcon from "../components/saveStickerIcon/saveStickerIcon";
import DeleteStickerIcon from "../components/deleteStickerIcon/deleteStickerIcon"
import { useState, useEffect } from "react";
import { useFetcher } from "react-router-dom";

const NewSticker = ({ setCreateNewSticker }) => {
	const [value, setValue] = useState("");
	const fetcher = useFetcher(); // Добавляем useFetcher

	const handleDeleteClick = () => {
		if (window.confirm('Вы уверены что хотите удалить введенный текст?')) {
			console.log("Удалить все нахрен!");
			setValue("");
			setCreateNewSticker(false);
		}

	};

	const handleSubmit = (e) => {
		if (!value.trim()) {
			e.preventDefault();
			alert('Введите текст стикера');
		}
	};

	useEffect(() => {
    if (fetcher.data?.success) {
			console.log(fetcher.data)
      setCreateNewSticker(false);
    }
  }, [fetcher.data, setCreateNewSticker]);

	return (
		<div
			className={styles.overlay}
			role="dialog"
			aria-modal="true"
			aria-labelledby="sticker-heading"
		>
			<fetcher.Form method="post" onSubmit={handleSubmit}>
				<div className={styles.container}>
					<input type="hidden" name="_action" value="create" />
					<h2 id="sticker-heading" className={styles.visually_hidden}>
						Новый стикер
					</h2>
					<textarea
						name="newSticker"
						id="newSticker"
						onChange={(e) => setValue(e.target.value)}
						placeholder="Введите текст..."
						autoFocus
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
							disabled={!value || fetcher.state === "submitting"}
							label={
								fetcher.state === "submitting" ? "Сохранение..." : "Сохранить"
							}
						/>
					</div>
				</div>
			</fetcher.Form>
		</div>
	);
};

export default NewSticker;

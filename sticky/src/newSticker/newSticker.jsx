import styles from "./newSticker.module.scss";
import { useState, useEffect } from "react";
import { useFetcher } from "react-router-dom";
import { IconSave, IconClose } from "../assets/icons/icons";
import { Tooltip } from "react-tooltip";

const NewSticker = ({ setCreateNewSticker }) => {
	const [value, setValue] = useState("");
	const fetcher = useFetcher(); // Добавляем useFetcher

	const handleDeleteClick = () => {
		if (window.confirm("Вы уверены что хотите удалить введенный текст?")) {
			console.log("Удалить все нахрен!");
			setValue("");
			setCreateNewSticker(false);
		}
	};

	const handleSubmit = (e) => {
		if (!value.trim()) {
			e.preventDefault();
			alert("Введите текст стикера");
		}
	};

	useEffect(() => {
		if (fetcher.data?.success) {
			console.log(fetcher.data);
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
						className={styles.textarea}
						name="newSticker"
						id="newSticker"
						onChange={(e) => setValue(e.target.value)}
						placeholder="Введите текст..."
						autoFocus
					></textarea>
					<div className={styles.wrap_button}>
						<button
							className={styles.button}
							type={"submit"}
							data-tooltip-id="save-tooltip"
							data-tooltip-content="Сохранить"
						>
							<IconSave />
						</button>
						<button
							className={styles.button}
							onClick={handleDeleteClick}
							data-tooltip-id="cancel-tooltip"
							data-tooltip-content="Отменить"
						>
							<IconClose />
						</button>
						<Tooltip id="save-tooltip" className={styles.tooltip_button} />
						<Tooltip id="cancel-tooltip" className={styles.tooltip_button} />
					</div>
				</div>
			</fetcher.Form>
		</div>
	);
};

export default NewSticker;

import { useDrag } from 'react-dnd'
import { StickerTypes } from './StickerTypes.js'
import styles from './sticker.module.scss'
import { useState, useEffect } from 'react'
import { useFetcher } from "react-router-dom";
import { IconClose, IconEdit, IconSave, IconTrash } from '../assets/icons/icons.jsx';
import { Tooltip } from 'react-tooltip';

export const Sticker = ({ id, left, top, zIndex, backgroundColor, hideSourceOnDrag, children, handleClickSticker }) => {
	const [isHovered, setIsHovered] = useState(false);
	const fetcher = useFetcher();
	const [isEdit, setIsEdit] = useState(false);
	const [text, setText] = useState(children);
	const [savedText, setSavedText] = useState('');

	useEffect(() => {
		setText(children);
	}, [children]);

	const [{ isDragging }, drag] = useDrag(
		() => ({
			type: StickerTypes.STICKER,
			item: { id, left, top, zIndex },
			collect: (monitor) => ({
				isDragging: monitor.isDragging(),
			}),
			enabled: !isEdit,
		}),
		[id, left, top, zIndex]
	);

	useEffect(() => {
		if (fetcher.data?.success) {
			setIsEdit(false);
			//fetcher.data = null; // Сброс данных fetcher
		}
	}, [fetcher.data, setIsEdit]);

	if (isDragging && hideSourceOnDrag) {
		return <div ref={drag} />;
	}

	const handleDeleteSticker = () => {
		if (window.confirm("Вы точно хотите удалить этот стикер?")) {
			fetcher.submit({ id: id, _action: "delete" }, { method: "post" });
		}
	};

	const handleEditSticker = () => {
		console.log("edit", id);
		setSavedText(text);
		setIsEdit(true);
		console.log(text);
	};

	const handleCancelEnter = () => {
		setIsEdit(false);
		setText(savedText);
	}

	const handleSave = (e) => {
		if (!text.trim()) {
			e.preventDefault();
			alert("Введите текст стикера");
			return;
		}
		if (text.length > 500) {
			e.preventDefault();
			alert("Ограничение 500 символов!");
			return;
		}
		console.log(text);
		fetcher.submit(
			{
				id: id,
				title: text,
				_action: "update",
			},
			{ method: "post" }
		);
	};

	return (
		<div
			className={`${styles.note} ${isHovered ? styles.note_hovered : ""} ${
				isEdit ? styles.wrap_note__edit : ""
			}`}
			ref={drag}
			//style={{ left, top, zIndex, backgroundColor }}
			style={{
				left: isEdit ? "50%" : left, // Если редактируем - центрируем
				top: isEdit ? "50%" : top, // Если редактируем - центрируем
				zIndex: isEdit ? 9999 : zIndex, // Временный высокий z-index
				backgroundColor,
				transform: isEdit ? "translate(-50%, -50%) scale(1.05)" : "none", // Центрирование + увеличение
			}}
			onClick={() => handleClickSticker(id)}
			onMouseEnter={() => setIsHovered(true)}
			onMouseLeave={() => setIsHovered(false)}
		>
			{isEdit ? (
				<div className={styles.note__edit}>
					<textarea className={styles.textarea}
						value={text}
						onChange={(e) => setText(e.target.value)}
						autoFocus
					/>
					<div className={`${styles.wrap_button} ${isEdit ? styles.wrap_button__edit : ''}`}>
						<button
							data-tooltip-id="save-tooltip"
							data-tooltip-content="Сохранить изменения"
							className={`${styles.button} ${isEdit ? styles.button__edit : ''}`}
							onClick={handleSave}
						>
							<IconSave />
						</button>
						<button
							data-tooltip-id="canсelEdit-tooltip"
							data-tooltip-content="Отменить изменения"
							className={`${styles.button} ${isEdit ? styles.button__edit : ''}`}
							onClick={handleCancelEnter}
						>
							<IconClose />
						</button>
						<Tooltip id="save-tooltip" className={styles.tooltip_button} />
						<Tooltip
							id="canсelEdit-tooltip"
							className={styles.tooltip_button}
						/>
					</div>
				</div>
			) : (
				<>
					<p>{text}</p>
				</>
			)}

			{isHovered && !isEdit ? (
				<div className={styles.wrap_button}>
					<button
						className={styles.button}
						onClick={handleEditSticker}
						data-tooltip-id="edit-tooltip"
						data-tooltip-content="Редактировать"
					>
						<IconEdit />
					</button>
					<button
						className={styles.button}
						onClick={handleDeleteSticker}
						data-tooltip-id="delete-tooltip"
						data-tooltip-content="Удалить стикер"
					>
						<IconTrash />
					</button>
					<Tooltip id="edit-tooltip" className={styles.tooltip_button} />
					<Tooltip id="delete-tooltip" className={styles.tooltip_button} />
				</div>
			) : null}
		</div>
	);
}

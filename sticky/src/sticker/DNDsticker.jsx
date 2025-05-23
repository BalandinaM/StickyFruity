import { useDrag } from 'react-dnd'
import { StickerTypes } from './StickerTypes.js'
import styles from './sticker.module.scss'
import { useState, useEffect } from 'react'
import { useFetcher } from "react-router-dom";
import StickerButton from '../components/stickerButton/stickerButton.jsx'
import DeleteStickerIcon from '../components/deleteStickerIcon/deleteStickerIcon.jsx'
import CloseStickerIcon from '../components/closeStickerIcon/closeStikerIcon.jsx'
import SaveStickerIcon from '../components/saveStickerIcon/saveStickerIcon.jsx'
import { IconClose, IconEdit, IconSave, IconTrash } from '../assets/icons/icons.jsx';
import { Tooltip } from 'react-tooltip';

export const DNDSticker = ({ id, left, top, zIndex, backgroundColor, hideSourceOnDrag, children, handleClickSticker }) => {
	const [isHovered, setIsHovered] = useState(false);
	const fetcher = useFetcher();
	const [isEdit, setIsEdit] = useState(false);
	const [text, setText] = useState(children);

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
		setIsEdit(true);
		console.log(text);
	};

	const handleSave = (e) => {
		if (!text.trim()) {
			e.preventDefault();
			alert("Введите текст стикера");
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
			className={`${styles.note} ${isHovered ? styles.note_hovered : ""}`}
			ref={drag}
			style={{ left, top, zIndex, backgroundColor }}
			onClick={() => handleClickSticker(id)}
			onMouseEnter={() => setIsHovered(true)}
			onMouseLeave={() => setIsHovered(false)}
		>
			{isEdit ? (
				<>
					<textarea
						value={text}
						onChange={(e) => setText(e.target.value)}
						autoFocus
					/>
					<div className={styles.wrap_button}>
						<button
							data-tooltip-id="save-tooltip"
							data-tooltip-content="Сохранить изменения"
							className={styles.button}
							onClick={handleSave}
						>
							<IconSave />
						</button>
						<button
							data-tooltip-id="canсelEdit-tooltip"
							data-tooltip-content="Отменить изменения"
							className={styles.button}
							onClick={handleSave}
						>
							<IconClose />
						</button>
						<Tooltip id="save-tooltip" className={styles.tooltip_button}/>
						<Tooltip id="canсelEdit-tooltip" className={styles.tooltip_button}/>
					</div>
				</>
			) : (
				<>
					<p>{children}</p>
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
					<Tooltip id="edit-tooltip" className={styles.tooltip_button}/>
					<Tooltip id="delete-tooltip" className={styles.tooltip_button}/>
				</div>
			) : null}
		</div>
	);
}

// подумать что делать с мобильной версией, может нахер?)
//поменять стили у тултипов
//обработчик клика на кнопку отменить редактирование

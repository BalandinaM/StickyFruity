import { useDrag } from 'react-dnd'
import { StickerTypes } from './StickerTypes.js'
import styles from './sticker.module.scss'
import { useState, useEffect } from 'react'
import { useFetcher } from "react-router-dom";
import StickerButton from '../components/stickerButton/stickerButton.jsx'
import DeleteStickerIcon from '../components/deleteStickerIcon/deleteStickerIcon.jsx'
import CloseStickerIcon from '../components/closeStickerIcon/closeStikerIcon.jsx'
import SaveStickerIcon from '../components/saveStickerIcon/saveStickerIcon.jsx'

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
    [id, left, top, zIndex],
  )

	useEffect(() => {
    if (fetcher.data?.success) {
      setIsEdit(false);
      //fetcher.data = null; // Сброс данных fetcher
    }
  }, [fetcher.data, setIsEdit]);

  if (isDragging && hideSourceOnDrag) {
    return <div ref={drag} />
  }

	const handleDeleteSticker = () => {
		if (window.confirm('Вы точно хотите удалить этот стикер?')) {
    fetcher.submit(
      { id: id, _action: "delete" },
      { method: "post" }
    );
		}
	}

	const handleEditSticker = () => {
		console.log('edit', id)
		setIsEdit(true);
		console.log(text)
	}

	const handleSave = (e) => {
		if (!text.trim()) {
			e.preventDefault();
			alert('Введите текст стикера');
			return;
		}
		console.log(text)
    fetcher.submit(
      {
        id: id,
        title: text,
        _action: "update"
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
					<textarea value={text} onChange={(e) => setText(e.target.value)} autoFocus/>
					<button className={styles.button} onClick={handleSave}>Сохранить</button>
				</>
			) : (
				<p>{children}</p>
			)}

			{isHovered && !isEdit ? (
				<div className={styles.wrap_button}>
					<button className={styles.button} onClick={handleEditSticker}>
						Редактировать
					</button>
					<button className={styles.button} onClick={handleDeleteSticker}>
						Удалить
					</button>
				</div>
			) : null}
		</div>
	);
}


//прописать стили для кнопок, надо сделать  динамический  размер шришта, и прозрачность, а при наведении на кнопку увеличивать яркость и возможно сделать жирное написание.

// добить карточку что бы блок с кнопками появлялся в момент наведения.

// навесить обработчики событий на кнопки удалить и редактировать.

// подумать что делать с мобильной версией, может нахер?)

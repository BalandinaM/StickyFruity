import { useDrag } from 'react-dnd'
import { StickerTypes } from './StickerTypes.js'
import styles from './sticker.module.scss'
import { useState } from 'react'
import StickerButton from '../components/stickerButton/stickerButton.jsx'
import DeleteStickerIcon from '../components/deleteStickerIcon/deleteStickerIcon.jsx'
import CloseStickerIcon from '../components/closeStickerIcon/closeStikerIcon.jsx'
import SaveStickerIcon from '../components/saveStickerIcon/saveStickerIcon.jsx'

export const DNDSticker = ({ id, left, top, zIndex, backgroundColor, hideSourceOnDrag, children, handleClickSticker }) => {

	const [isHovered, setIsHovered] = useState(false);


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
  if (isDragging && hideSourceOnDrag) {
    return <div ref={drag} />
  }
  return (
    <div
      className={`${styles.note} ${isHovered ? styles.note_hovered : ''}`}
      ref={drag}
      style={{ left, top, zIndex, backgroundColor }}
      onClick = {() => handleClickSticker(id)}
			onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <p>{children}</p>
			{isHovered ?
			(<div className={styles.wrap_button}>
				<button className={styles.button}>Редактировать</button>
				<button className={styles.button}>Удалить</button>
			</div>) : null}
    </div>
  )
}


//прописать стили для кнопок, надо сделать  динамический  размер шришта, и прозрачность, а при наведении на кнопку увеличивать яркость и возможно сделать жирное написание.

// добить карточку что бы блок с кнопками появлялся в момент наведения.

// навесить обработчики событий на кнопки удалить и редактировать.

// подумать что делать с мобильной версией, может нахер?)

import styles from './DNDstickerBoard.module.scss'
import update from 'immutability-helper'
import { useCallback, useState } from 'react'
import { useDrop } from 'react-dnd'
import { DNDSticker } from '../sticker/DNDsticker'
import { StickerTypes} from '../sticker/StickerTypes.js'
import { softSnap as doSnapToGrid } from './snapToGrid.js'

const style = {
  width: '100%',
  height: '100%',
  backgroundColor: 'violet',
  border: '1px solid black',
  position: 'relative',
}
export const DNDStickerBoard = ({ hideSourceOnDrag = true, snapToGrid = true, setCreateNewSticker, arrNotes }) => {
  console.log('hideSourceOnDrag:', hideSourceOnDrag);
  console.log('snapToGrid:', snapToGrid);
	console.log('В зону днд пришел массив', arrNotes);
  // const [stickers, setStickers] = useState({
  //   a: { top: 20, left: 100, title: 'Drag me around', zIndex: 1 },
  //   b: { top: 100, left: 200, title: 'Drag me 111', zIndex: 1 },
  //   c: { top: 180, left: 350, title: 'Drag me 222', zIndex: 1 },
  //   d: { top: 180, left: 350, title: 'Drag me 333', zIndex: 1 },
  //   e: { top: 180, left: 450, title: 'Drag me 444', zIndex: 1 },
  // })
	const [stickers, setStickers] = useState(arrNotes)


  const moveBox = useCallback(
    (id, left, top, zIndex) => {
        setStickers(
        update(stickers, {
          [id]: {
            $merge: { left, top, zIndex },
          },
        }),
      )
    },
    [stickers, setStickers],
  )

  const [, drop] = useDrop(
    () => ({
      accept: StickerTypes.STICKER,
      drop(item, monitor) {
        const delta = monitor.getDifferenceFromInitialOffset()
        let left = Math.round(item.left + delta.x)
        let top = Math.round(item.top + delta.y)
        const stickerWidth = 250;
        const stickerHeight = 250;

        // Проверяем, находится ли стикер поверх другого стикера
        const overlappingStickers = Object.keys(stickers).filter((key) => {
          const s = stickers[key];


          return (
            key !== item.id &&
            left < s.left + stickerWidth &&
            left + stickerWidth > s.left &&
            top < s.top + stickerHeight &&
            top + stickerHeight > s.top
          );
        });

        let newZIndex = item.zIndex;
        let topZIndex = 0;

        if (overlappingStickers.length > 0) {
          topZIndex = Math.max(
            ...overlappingStickers.map(key => stickers[key].zIndex || 0)
          );
          console.log('Максимальный zIndex среди наложенных стикеров:', topZIndex)
          newZIndex = topZIndex + 1;
          if (snapToGrid) {
            ;[left, top] = doSnapToGrid(left, top)
          }
          moveBox(item.id, left, top, newZIndex)
        } else {
          if (snapToGrid) {
            ;[left, top] = doSnapToGrid(left, top)
          }
          moveBox(item.id, left, top, newZIndex)
        }

        return undefined
      },
    }),
    [moveBox],
  )

  const handleClickSticker = (id) => {
    console.log(`Клик по стикеру! ${id}`);

    // 1. Находим все стикеры, с которыми есть пересечение
    const overlappingStickers = Object.keys(stickers).filter((key) => {
      const currentSticker = stickers[id]; // Получаем данные текущего стикера
      const s = stickers[key];

      return (
        key !== id && // Не тот же самый стикер
        currentSticker.left >= s.left - 50 &&
        currentSticker.left <= s.left + 50 && // Проверка по X
        currentSticker.top >= s.top - 50 &&
        currentSticker.top <= s.top + 50 // Проверка по Y
      );
    });

    console.log('Пересекающиеся стикеры:', overlappingStickers);

    if (overlappingStickers.length > 0) {
      console.log('Стикер находится в стопке! Поднимаем на верх...');

			//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
			// тут из рефа надо будет достать!!!
			//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

      // 2. Находим максимальный zIndex среди всех стикеров (не только пересекающихся)
      const allZIndices = Object.values(stickers).map(s => s.zIndex || 0);
      const maxZIndex = Math.max(...allZIndices);

      // 3. Устанавливаем новый zIndex (на 1 больше максимального)
      const newZIndex = maxZIndex + 1;

      // 4. Обновляем стикер
      setStickers(prev => ({
        ...prev,
        [id]: {
          ...prev[id],
          zIndex: newZIndex
        }
      }));

      console.log(`Новый zIndex для стикера ${id}: ${newZIndex}`);
    }
  }

  return (
        <>
        	<div ref={drop} style={style}>
	          {Object.keys(stickers).map((key) => {
	            const { left, top, title, zIndex } = stickers[key]
	            return (
	                  <DNDSticker
	                    key={key}
	                    id={key}
	                    left={left}
	                    top={top}
	                    zIndex={zIndex}
	                    hideSourceOnDrag={hideSourceOnDrag}
	                    handleClickSticker={handleClickSticker}
	                  >
	                    {title}
	                  </DNDSticker>
	            )
	          })}
	        </div>
					<button
						className={`${styles.commonButton} ${styles.circleButton}`}
						onClick={() => setCreateNewSticker(true)}
						type="button"
					/>
        </>
  )
}


import styles from './stickerBoard.module.scss'
import update from 'immutability-helper'
import { useCallback, useState, useRef, useEffect } from 'react'
import { useDrop } from 'react-dnd'
import { Sticker } from '../sticker/sticker.jsx'
import { StickerTypes} from '../sticker/StickerTypes.js'
import { softSnap as doSnapToGrid } from './snapToGrid.js'
import { updateNote } from '../forStorage.js'

const style = {
  width: '100%',
  height: '100%',
  position: 'relative',
}
export const StickerBoard = ({ hideSourceOnDrag = true, snapToGrid = true, setCreateNewSticker, arrNotes }) => {
	const [stickers, setStickers] = useState(arrNotes);
	const saveTimeoutRef = useRef(null);

  useEffect(() => {
    setStickers(arrNotes);
  }, [arrNotes]);

  const saveStickerPosition = useCallback(async (id, updatedSticker) => {
    try {
      await updateNote(id, updatedSticker);
    } catch (error) {
      console.error(`Ошибка при сохранении стикера ${id}:`, error);
    }
  }, []);


   const moveBox = useCallback(
    (id, left, top, zIndex) => {
      const updatedStickers = update(stickers, {
        [id]: {
          $merge: { left, top, zIndex },
        },
      });

      setStickers(updatedStickers);

      if (saveTimeoutRef.current) {
        clearTimeout(saveTimeoutRef.current);
      }

      saveTimeoutRef.current = setTimeout(() => {
        saveStickerPosition(id, updatedStickers[id]);
      }, 500);
    },
    [stickers, saveStickerPosition],
  );

  useEffect(() => {
    return () => {
      if (saveTimeoutRef.current) {
        clearTimeout(saveTimeoutRef.current);
      }
    };
  }, []);

  const [, drop] = useDrop(
    () => ({
      accept: StickerTypes.STICKER,
      drop(item, monitor) {
        const delta = monitor.getDifferenceFromInitialOffset()
        let left = Math.round(item.left + delta.x)
        let top = Math.round(item.top + delta.y)
        const stickerWidth = 250;
        const stickerHeight = 250;

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

	const handleClickSticker = useCallback(async (id) => {

  const overlappingStickers = Object.keys(stickers).filter((key) => {
    const currentSticker = stickers[id];
    const s = stickers[key];
    return (
      key !== id &&
      currentSticker.left >= s.left - 250 &&
      currentSticker.left <= s.left + 250 &&
      currentSticker.top >= s.top - 250 &&
      currentSticker.top <= s.top + 250
    );
  });

  if (overlappingStickers.length > 0) {

    const allZIndices = Object.values(stickers).map(s => s.zIndex || 0);
    const newZIndex = Math.max(...allZIndices) + 1;

    setStickers(prev => {
      const updatedStickers = {
        ...prev,
        [id]: {
          ...prev[id],
          zIndex: newZIndex
        }
      };

      saveStickerPosition(id, updatedStickers[id]);

      return updatedStickers;
    });

  }
}, [stickers, saveStickerPosition]);

  return (
        <>
        	<div ref={drop} style={style}>
	          {Object.keys(stickers).map((key) => {
	            const { left, top, title, zIndex, color } = stickers[key]
	            return (
	                  <Sticker
	                    key={key}
	                    id={key}
	                    left={left}
	                    top={top}
	                    zIndex={zIndex}
											backgroundColor={color}
	                    hideSourceOnDrag={hideSourceOnDrag}
	                    handleClickSticker={handleClickSticker}
	                  >
	                    {title}
	                  </Sticker>
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


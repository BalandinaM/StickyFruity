import { useDrag } from 'react-dnd'
import { StickerTypes } from './StickerTypes.js'
import styles from './sticker.module.scss'

export const DNDSticker = ({ id, left, top, zIndex, backgroundColor, hideSourceOnDrag, children, handleClickSticker }) => {
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
      className={styles.note}
      ref={drag}
      style={{ left, top, zIndex, backgroundColor }}
      //data-testid="box"
      onClick = {() => handleClickSticker(id)}
    >
      {children}
    </div>
  )
}

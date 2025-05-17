import { useDrag } from 'react-dnd'
import { StickerTypes } from './StickerTypes.js'
const style = {
  position: 'absolute',
  border: '2px dashed gray',
  width: '250px',
  height: '250px',
  backgroundColor: 'red',
  padding: '0.5rem 1rem',
  cursor: 'move',
}
export const DNDSticker = ({ id, left, top, zIndex, hideSourceOnDrag, children, handleClickSticker }) => {
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
      className="box"
      ref={drag}
      style={{ ...style, left, top, zIndex }}
      data-testid="box"
      onClick = {() => handleClickSticker(id)}
    >
      {children}
    </div>
  )
}

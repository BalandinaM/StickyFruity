import styles from './stickerEdit.module.scss';
import { useFetcher } from "react-router-dom";
import { useState, useEffect } from 'react';
import StickerButton from '../components/stickerButton/stickerButton';
import SaveStickerIcon from '../components/saveStickerIcon/saveStickerIcon';
import DeleteStickerIcon from '../components/deleteStickerIcon/deleteStickerIcon';
import CloseStickerIcon from '../components/closeStickerIcon/closeStikerIcon';

const StickerEdit = ({ item, onClose }) => {
	const fetcher = useFetcher();
  const [text, setText] = useState(item.note);

  const handleSave = () => {
    fetcher.submit(
      {
        id: item.id,
        note: text,
        _action: "update"
      },
      { method: "post" }
    );
  };

	const handleDelete = () => {
    if (window.confirm('Вы точно хотите удалить этот стикер?')) {
    fetcher.submit(
      { id: item.id, _action: "delete" },
      { method: "post" }
    );
		}
  };

	useEffect(() => {
    if (fetcher.data?.success) {
      onClose(); // Закрываем стикер после сохранения
    }
  }, [fetcher.data, onClose]);

	return (
		<li
			key={item.id}
			className={styles.note_active}
			style={{ "--note-color": item.color }}
		>
			<textarea value={text} onChange={(e) => setText(e.target.value)} />
			<div className={styles.wrap_button}>
				<StickerButton handleClick={handleDelete} icon={<DeleteStickerIcon />} type="button"></StickerButton>
			<StickerButton handleClick={handleSave} icon={<SaveStickerIcon />} type="button" disabled={fetcher.state === "submitting"}>
					{fetcher.state === "submitting" ? "Сохранение..." : "Save"}
				</StickerButton>

				<StickerButton customClass={styles.button_close} handleClick={() => onClose()} icon={<CloseStickerIcon />} type="button"></StickerButton>

			</div>
		</li>
	);
};

export default StickerEdit;

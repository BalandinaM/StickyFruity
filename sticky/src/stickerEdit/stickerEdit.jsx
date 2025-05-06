import styles from './stickerEdit.module.scss';
import { useFetcher } from "react-router-dom";
import { useState, useEffect } from 'react';

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
    fetcher.submit(
      { id: item.id, _action: "delete" },
      { method: "post" }
    );
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
			<div>
				<button onClick={handleSave} disabled={fetcher.state === "submitting"}>
					{fetcher.state === "submitting" ? "Сохранение..." : "Save"}
				</button>
				<button onClick={handleDelete}>Delete</button>
			</div>
		</li>
	);
};

export default StickerEdit;

import styles from "./stickerBoard.module.scss";
import { useState } from "react";
import NewSticker from "../newSticker/newSticker";
import { StickerBoard } from "./stickerBoard";
import { EmptyStickerBoard } from "../emptyStickerBoard/emptyStickerBoard";

const StickerBoardContainer = ({ arrNotes }) => {
	console.log("В StickerBoard пришло", typeof(arrNotes));
	const [createNewSticker, setCreateNewSticker] = useState(false);
	const hasNotes = arrNotes && Object.keys(arrNotes).length > 0;


	return (
		<main className={styles.main}>
			{hasNotes ? (
				<StickerBoard setCreateNewSticker={setCreateNewSticker} arrNotes={arrNotes} ></StickerBoard>
			) : (
				<EmptyStickerBoard setCreateNewSticker={setCreateNewSticker}/>
			)}

			{createNewSticker && (
				<NewSticker setCreateNewSticker={setCreateNewSticker} />
			)}
		</main>
	);
};

export default StickerBoardContainer;

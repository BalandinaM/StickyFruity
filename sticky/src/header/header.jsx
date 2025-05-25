import styles from "./header.module.scss";

const Header = () => {
	return (
		<header className={styles.header} role="banner">
			<h1 className={styles.logo}>
				<span className={styles.visually_hidden}>
					Онлайн-доска для создания заметок "StickyFruity"
				</span>
				<span aria-hidden="true">StickyFruity</span>
			</h1>
		</header>
	);
};

export default Header;

import styles from "./header.module.scss";
//import logo from './../assets/images/logoStickyFruity.png'

const Header = () => {
	return (
		<header className={styles.header} role="banner">
			<h1 className={styles.logo}>
				<span className={styles.visually_hidden}>
					Онлайн-доска для создания заметок "StickyFruity"
				</span>
				<span aria-hidden="true">StickyFruity</span>
			</h1>
			{/* <img className={styles.logo} src={logo} alt="Логотип StickyFruity" width="215" height="45"/> */}
			{/* <span >StickyFruity</span> */}
		</header>
	);
};

export default Header;

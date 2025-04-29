import styles from './header.module.scss';
import logo from './../assets/images/logoStickyFruity.png'

const Header = () => {
	return (
		<header className={styles.header}>
			<h1 className={styles.visually_hidden}>Онлайн-доска для создания заметок "StickyFruity"</h1>
			<img className={styles.logo} src={logo} alt="Логотип StickyFruity" width="215" height="45"/>
		</header>
	)
}

export default Header;

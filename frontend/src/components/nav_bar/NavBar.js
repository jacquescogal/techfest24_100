import React, { useState } from 'react'
import styles from './NavBar.module.scss'
import { ReactComponent as MenuIcon } from '../../assets/icons/menu_icon.svg';
import app_logo from '../../assets/icons/app_logo.png'
import NavMenu from '../../components/nav_menu/NavMenu.js';
import { Link } from 'react-router-dom'; // Just import Link

const NavBar = () => {
    const [menu, setMenu] = useState(false);
    const openMenu = () => {
        setMenu(!menu)
    }

    return (
        <div>
            <div className={styles.navbar}>
                <MenuIcon className={styles.menu_icon} onClick={openMenu} />
                {menu && <NavMenu />}
                <Link to="/" className={styles.header_link}><h3>Analogy</h3></Link>
                <Link to="/Story" className={styles.header_link}><h3>Story</h3></Link>
                <Link to="/Chat" className={styles.header_link}><h3>Chat</h3></Link>
                <img src={app_logo} alt="App Logo" className={styles.app_logo} />
            </div>
        </div>
    )
}

export default NavBar
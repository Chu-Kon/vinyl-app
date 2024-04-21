import React from 'react';
import { Link, useLocation, useState } from 'react-router-dom';
import { ActionIcon, Tooltip, useMantineColorScheme, useComputedColorScheme, SegmentedControl } from '@mantine/core';
import { IconSun, IconMoon } from '@tabler/icons-react';
import { useTranslation } from 'react-i18next';
import './Header.scss';

// const LanguageSwitcher = () => {
//   const { i18n } = useTranslation();
//   const [selectedLanguage, setSelectedLanguage] = useState('en');

//   return (
//     <SegmentedControl 
//       className='lang-switcher'
//       withItemsBorders={false} 
//       radius='xl' 
//       value={selectedLanguage}
//       onChange={(language) => {
//         setSelectedLanguage(language);
//         if (language === 'Eng') {
//           i18n.changeLanguage('en');
//         } else if (language === 'Рус') {
//           i18n.changeLanguage('ru');
//         }
//       }}
//       data={[
//         { label: 'Eng', value: 'Eng' },
//         { label: 'Рус', value: 'Рус' }
//       ]}
//     />
//   );
// };

export default function Header() {
    const location = useLocation();
    // const { t } = useTranslation('header');
    const { setColorScheme } = useMantineColorScheme();
    const computedColorScheme = useComputedColorScheme('light', { getInitialValueInEffect: true });
    return (
      <header className="header">
        <img className="header__logo" 
             src="https://cdn-icons-png.freepik.com/512/7831/7831853.png?ga=GA1.1.544374723.1713081426"
             alt="Logo vinyl disc"
        ></img>
        <nav className="nav header__nav">
          <ul className="nav__list">
            <li className="nav__item">
              <Link to="/" className={`nav__link ${location.pathname === '/' ? 'active-link' : ''}`}>Search</Link>
            </li>
            <li className="nav__item">
              <Link to="/collection" className={`nav__link ${location.pathname === '/collection' ? 'active-link' : ''}`}>My collection</Link>
            </li>
            <li className="nav__item">
              <Link to="/wishlist" className={`nav__link ${location.pathname === '/wishlist' ? 'active-link' : ''}`}>Wishlist</Link>
            </li>
            <li className="nav__item">
              <Link to="/about" className={`nav__link ${location.pathname === '/about' ? 'active-link' : ''}`}>About</Link>
            </li>
            <li className="nav__item">
              <Link to="/settings" className={`nav__link ${location.pathname === '/settings' ? 'active-link' : ''}`}>Settings</Link>
            </li>
            <li className="nav__item">
              <Link to="/login" className={`nav__link ${location.pathname === '/login' ? 'active-link' : ''}`}>Login</Link>
            </li>
          </ul>
        </nav>
        <>
          {/* <LanguageSwitcher /> */}
          <Tooltip label="Switch theme" color="violet"
          transitionProps={{ transition: 'skew-up', duration: 300 }}>
            <ActionIcon
              onClick={() => setColorScheme(computedColorScheme === 'light' ? 'dark' : 'light')}
              variant="default"
              size="xl"
              aria-label="Toggle color scheme"
            >
              {computedColorScheme === 'light' ? (
                <IconMoon stroke={1.5} />
              ) : (
                <IconSun stroke={1.5} />
              )}
            </ActionIcon>
          </Tooltip>
        </>
      </header>
    )
  }
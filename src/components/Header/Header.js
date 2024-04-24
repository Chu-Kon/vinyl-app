import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ActionIcon, Tooltip, useMantineColorScheme, useComputedColorScheme, SegmentedControl, Burger, Menu, rem } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconSun, IconMoon, IconHeart, IconSettings, IconSearch, IconPlus, IconInfoCircle, IconLogin2 } from '@tabler/icons-react';
import { useTranslation } from 'react-i18next';
import './Header.scss';

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();
  const [selectedLanguage, setSelectedLanguage] = useState('en');

  return (
    <SegmentedControl 
      className='lang-switcher'
      withItemsBorders={false} 
      radius='xl' 
      value={selectedLanguage}
      onChange={(language) => {
        setSelectedLanguage(language);
        if (language === 'Eng') {
          i18n.changeLanguage('en');
        } else if (language === 'Рус') {
          i18n.changeLanguage('ru');
        }
      }}
      data={[
        { label: 'Eng', value: 'Eng' },
        { label: 'Рус', value: 'Рус' }
      ]}
    />
  );
};

export default function Header() {
  const location = useLocation();
  const { t } = useTranslation('header');
  const { setColorScheme } = useMantineColorScheme();
  const computedColorScheme = useComputedColorScheme('light', { getInitialValueInEffect: true });
  const [opened, { toggle }] = useDisclosure();

  return (
      <header className="header">
          <Link to="/search">
              <img
                  className="header__logo"
                  src="https://cdn-icons-png.freepik.com/512/7831/7831853.png?ga=GA1.1.544374723.1713081426"
                  alt="Logo vinyl disc"
              ></img>
          </Link>
          <nav className="nav header__nav">
              <ul className="nav__list">
                  <li className="nav__item">
                      <Link to="/search" className={`nav__link ${location.pathname === '/search' ? 'active-link' : ''}`}>{t('nav-search')}</Link>
                  </li>
                  <li className="nav__item">
                      <Link to="/collection" className={`nav__link ${location.pathname === '/collection' ? 'active-link' : ''}`}>{t('nav-collection')}</Link>
                  </li>
                  <li className="nav__item">
                      <Link to="/wishlist" className={`nav__link ${location.pathname === '/wishlist' ? 'active-link' : ''}`}>{t('nav-wishlist')}</Link>
                  </li>
                  <li className="nav__item">
                      <Link to="/about" className={`nav__link ${location.pathname === '/about' ? 'active-link' : ''}`}>{t('nav-about')}</Link>
                  </li>
                  <li className="nav__item">
                      <Link to="/settings" className={`nav__link ${location.pathname === '/settings' ? 'active-link' : ''}`}>{t('nav-settings')}</Link>
                  </li>
                  <li className="nav__item">
                      <Link to="/login" className={`nav__link ${location.pathname === '/login' ? 'active-link' : ''}`}>{t('nav-login')}</Link>
                  </li>
              </ul>
          </nav>


          <div className="nav-mobile">
            <Menu shadow="md" width={220} position="bottom-start" offset={0}>
              <Menu.Target>
                <Burger color="white" size="lg" opened={opened} aria-label="Toggle navigation"></Burger>
              </Menu.Target>
              <Menu.Dropdown>
                <Menu.Item leftSection={<IconSearch style={{ width: rem(14), height: rem(14) }} />}>
                  <Link to="/search" className={`nav-mobile__link ${location.pathname === '/search' ? 'active-link' : ''}`}>{t('nav-search')}</Link>
                </Menu.Item>
                <Menu.Item leftSection={<IconPlus style={{ width: rem(14), height: rem(14) }} />}>
                  <Link to="/collection" className={`nav-mobile__link ${location.pathname === '/collection' ? 'active-link' : ''}`}>{t('nav-collection')}</Link>
                </Menu.Item>
                <Menu.Item leftSection={<IconHeart style={{ width: rem(14), height: rem(14) }} />}>
                  <Link to="/wishlist" className={`nav-mobile__link ${location.pathname === '/wishlist' ? 'active-link' : ''}`}>{t('nav-wishlist')}</Link>
                </Menu.Item>
                <Menu.Item leftSection={<IconInfoCircle style={{ width: rem(14), height: rem(14) }} />}>
                  <Link to="/about" className={`nav-mobile__link ${location.pathname === '/about' ? 'active-link' : ''}`}>{t('nav-about')}</Link>
                </Menu.Item>
                <Menu.Divider />
                <Menu.Item leftSection={<IconSettings style={{ width: rem(14), height: rem(14) }} />}>
                  <Link to="/settings" className={`nav-mobile__link ${location.pathname === '/settings' ? 'active-link' : ''}`}>{t('nav-settings')}</Link>
                </Menu.Item>
                <Menu.Item color="red" leftSection={<IconLogin2 style={{ width: rem(14), height: rem(14) }} />}>
                  <Link to="/login" className={`nav-mobile__link ${location.pathname === '/login' ? 'active-link' : ''}`}>{t('nav-login')}</Link>
                </Menu.Item>
              </Menu.Dropdown>
            </Menu>
          </div>

          <div className="header__controls">
              <LanguageSwitcher />

              <Tooltip label={t('theme-switcher')} color="violet" transitionProps={{ transition: 'skew-up', duration: 300 }}>
                  <ActionIcon
                      className='theme-switcher'
                      onClick={() => setColorScheme(computedColorScheme === 'light' ? 'dark' : 'light')}
                      variant="default"
                      size="xl"
                      radius="xl"
                      aria-label="Toggle color scheme"
                  >
                      {computedColorScheme === 'light' ? (
                          <IconSun stroke={2} />
                      ) : (
                          <IconMoon stroke={2} />
                      )}
                  </ActionIcon>
              </Tooltip>
          </div>
      </header>
  )
}

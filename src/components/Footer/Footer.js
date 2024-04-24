import React from 'react';
import { useTranslation } from 'react-i18next';
import './Footer.scss';

export default function Footer() {
  const { i18n } = useTranslation();
  const { t } = useTranslation('footer');
  return (
    <footer className='footer'>
        <p className='footer__copyright'>&#9400;{t('footer-copyright')}</p>
    </footer>
  )
}

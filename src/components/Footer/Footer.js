import React from 'react';
import { useTranslation } from 'react-i18next';
import { IconBrandGithub } from '@tabler/icons-react';
import './Footer.scss';

export default function Footer() {
  const { i18n } = useTranslation();
  const { t } = useTranslation('footer');
  return (
    <footer className='footer'>
        <p className='footer__copyright'>&#9400;{t('footer-copyright')}</p>
        <a className='footer__github' href='https://github.com/Chu-Kon/vinyl-app/pull/1' target="_blank"><IconBrandGithub stroke={1.5} /></a>
    </footer>
  )
}

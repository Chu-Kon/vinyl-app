import React from 'react';
import { Title, Mark, Text } from '@mantine/core';
import { useTranslation } from 'react-i18next';
import './AboutPage.scss';

export default function AboutPage() {
  const { i18n } = useTranslation();
  const { t } = useTranslation('about');
  return (
    <div className='about-content'>
        <Title order={1}>{t('about-title')}</Title>
        <Text>{t('about-text1')}</Text>
        <Text>{t('about-text2')}</Text>
        <Title order={2}>{t('about-title2')}</Title>
        <Text>{t('about-text3')}</Text>
        <Text>{t('about-text4')}<Mark color="violet"><b>+</b> <i>{t('mark-italic-text1')}</i></Mark> {t('about-text5')}</Text>
        <Text>{t('about-text4')}<Mark color="violet"><b>&#x2661;</b> <i>{t('mark-italic-text2')}</i></Mark> {t('about-text6')}</Text>
        <Text>{t('about-text7')}</Text>
        <Text>{t('about-text8')}</Text>
    </div>
  )
}

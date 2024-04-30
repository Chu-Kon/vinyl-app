import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
import headerEn from './en/headerEN.json';
import headerRu from './ru/headerRU.json';
import searchEn from './en/searchEN.json';
import searchRu from './ru/searchRU.json';
import collectionEn from './en/collectionEN.json';
import collectionRu from './ru/collectionRU.json';
import wishlistEn from './en/wishlistEN.json';
import wishlistRu from './ru/wishlistRU.json';
import aboutEn from './en/aboutEN.json';
import aboutRu from './ru/aboutRU.json';
import settingsEn from './en/settingsEN.json';
import settingsRu from './ru/settingsRU.json';
import loginEn from './en/loginEN.json';
import loginRu from './ru/loginRU.json';
import footerEn from './en/footerEN.json';
import footerRu from './ru/footerRU.json';
import notFoundEn from './en/notFoundEN.json';
import notFoundRu from './ru/notFoundRU.json';


const resources = {
    en: {
        header: headerEn,
        search: searchEn,
        collection: collectionEn,
        wishlist: wishlistEn,
        about: aboutEn,
        settings: settingsEn,
        login: loginEn,
        footer: footerEn,
        notFound: notFoundEn
    },
    ru: {
        header: headerRu,
        search: searchRu,
        collection: collectionRu,
        wishlist: wishlistRu,
        about: aboutRu,
        settings: settingsRu,
        login: loginRu,
        footer: footerRu,
        notFound: notFoundRu
    }
}

i18next.use(initReactI18next).init({
    resources,
    lng: 'en',
    fallback: 'en',
    ns: ['header', 'search', 'collection', 'wishlist', 'about', 'settings', 'login', 'footer', 'notFound'],
    interpolation: {
        escapeValue: false
    }
})

export default i18next
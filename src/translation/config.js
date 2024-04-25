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
import footerEn from './en/footerEN.json';
import footerRu from './ru/footerRU.json';


const resources = {
    en: {
        header: headerEn,
        search: searchEn,
        collection: collectionEn,
        wishlist: wishlistEn,
        about: aboutEn,
        footer: footerEn
    },
    ru: {
        header: headerRu,
        search: searchRu,
        collection: collectionRu,
        wishlist: wishlistRu,
        about: aboutRu,
        footer: footerRu
    }
}

i18next.use(initReactI18next).init({
    resources,
    lng: 'en',
    fallback: 'en',
    ns: ['header', 'search', 'collection', 'wishlist', 'about', 'footer'],
    interpolation: {
        escapeValue: false
    }
})

export default i18next
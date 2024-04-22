// import logo from './logo.svg';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import SearchPage from './components/SearchPage/SearchPage';
import WishlistPage from './components/WishlistPage/WishlistPage';
import CollectionPage from './components/CollectionPage/CollectionPage';
import AboutPage from './components/AboutPage/AboutPage';
import SettingsPage from './components/SettingsPage/SettingsPage';
import LoginPage from './components/LoginPage/LoginPage';
import { MantineProvider } from '@mantine/core';
import '@mantine/core/styles.css';
import './App.scss';
// import './i18n/config'

function App() {
  return (
    <MantineProvider
    withGlobalStyles
    withNormalizeCSS
    theme={{
      colorScheme: 'dark',
      colors: {
        dark: [
          '#d5d7e0',
          '#acaebf',
          '#8c8fa3',
          '#666980',
          '#4d4f66',
          '#34354a',
          '#2b2c3d',
          '#1d1e30',
          '#0c0d21',
          '#01010a',
        ],
      },
    }}
  >
      <Router>
        <div className="App">
          <Header></Header>
          <Routes>
            <Route path="/search" element={<SearchPage></SearchPage>} />
            <Route path="/collection" element={<CollectionPage></CollectionPage>} />
            <Route path="/wishlist" element={<WishlistPage></WishlistPage>} />
            <Route path="/about" element={<AboutPage></AboutPage>} />
            <Route path="/settings" element={<SettingsPage></SettingsPage>} />
            <Route path="/login" element={<LoginPage></LoginPage>} />
          </Routes>
          <Footer></Footer>
          {/* <div id="modal-root"></div> */}
        </div>
      </Router>
    </MantineProvider>
  );
}

export default App;

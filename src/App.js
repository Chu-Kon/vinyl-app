import logo from './logo.svg';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import SearchPage from './components/SearchPage/SearchPage';
import AboutPage from './components/AboutPage/AboutPage';
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
        {/* <div className="wrapper">
          <h1>Using Sass in React</h1>
          <header className="wrapper__btns">
            <button className="wrapper__btns_color_blue">Blue Button</button>
            <button className="wrapper__btns_color_red">Red Button</button>
            <button className="wrapper__btns_color_green">Green Button</button>
          </header>
        </div> */}
        <div className="App">
          <Header></Header>
          <Routes>
            <Route path="/" element={<SearchPage></SearchPage>} />
            <Route path="/about" element={<AboutPage></AboutPage>} />
          </Routes>
          <Footer></Footer>
          {/* <div id="modal-root"></div> */}
        </div>
      </Router>
    </MantineProvider>
  );
}

export default App;

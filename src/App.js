import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './css/styles.css';
import Home from './components/home';
import Result from './components/result';
import Disclaimer from './components/disclaimer';
import Nav from './components/nav';
import Footer from './components/footer';
import ScrollToTop from './components/ScrollToTop';

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop>
        <Nav />
        <Routes>
          <Route path="weather-app/" element={<Home />} />
          <Route path="weather-app/result" element={<Result />}/>
          <Route path="weather-app/disclaimer" element={<Disclaimer />}/>
        </Routes>
        <Footer />
      </ScrollToTop>
    </BrowserRouter>
  );
}

export default App;

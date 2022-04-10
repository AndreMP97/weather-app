import { Routes, Route } from 'react-router-dom';
import './css/styles.css';
import Home from './components/home';
import Result from './components/result';
import Disclaimer from './components/disclaimer';
import Nav from './components/nav';
import Footer from './components/footer';
import ScrollToTop from './components/ScrollToTop';
import Error from './components/404';

function App() {
  return (
      <ScrollToTop>
        <Nav />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="result" element={<Result />}/>
          <Route path="disclaimer" element={<Disclaimer />}/>
          <Route path="*" element={<Error />}/>
        </Routes>
        <Footer />
      </ScrollToTop>
  );
}

export default App;

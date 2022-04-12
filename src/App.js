import { Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './css/styles.css';
import Mainpage from './components/mainpage';
import Result from './components/show-results';
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
          <Route path="/" element={<Mainpage />} />
          <Route path="result" element={<Result />}/>
          <Route path="disclaimer" element={<Disclaimer />}/>
          <Route path="*" element={<Error />}/>
        </Routes>
        <Footer />
      </ScrollToTop>
  );
}

export default App;

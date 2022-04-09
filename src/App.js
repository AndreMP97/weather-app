import { BrowserRouter, Routes, Route} from 'react-router-dom';
import './App.css';
import './css/styles.css';
import Home from './components/home';
import Result from './components/result';
import Disclaimer from './components/disclaimer';
import Error from './components/404';
import Nav from './components/nav';
import Footer from './components/footer';

function App() {
  return (
    <BrowserRouter>
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/result" element={<Result />}/>
        <Route path="/disclaimer" element={<Disclaimer />}/>
        <Route path="*" element={<Error />}/>
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import './css/styles.css';
import Home from './components/home';
import Result from './components/result';
import Disclaimer from './components/disclaimer';
import Nav from './components/nav';
import Footer from './components/footer';

function App() {
  return (
    <BrowserRouter>
      <Nav />
      <Routes>
        <Route path="weather-app/" element={<Home />} />
        <Route path="weather-app/result" element={<Result />}/>
        <Route path="weather-app/disclaimer" element={<Disclaimer />}/>
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;

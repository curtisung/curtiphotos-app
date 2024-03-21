import './App.css';
import { BrowserRouter, Routes, Route, } from 'react-router-dom';

import ContactPage from "./components/ContactPage.js";
import BookGradShootPage from "./components/BookGradShootPage.js";
import LandingPage from "./components/LandingPage.js";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/" element={<LandingPage/>}/>
          <Route path="/contact" element={<ContactPage/>}/>
          <Route path="/grad-shoot-booking" element={<BookGradShootPage/>}/>
        </Routes>
      </div>
      
    </BrowserRouter>
    
  );
}

export default App;

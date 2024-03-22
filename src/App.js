import './App.css';
import { BrowserRouter, Routes, Route, } from 'react-router-dom';

import ContactPage from "./components/ContactPage.js";
import BookGradShootPage from "./components/BookGradShootPage.js";
import LandingPage from "./components/LandingPage.js";
import WorksPage from "./components/WorksPage.js";
import Header from "./components/Header.js";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Header/>
        <Routes>
          <Route path="/" element={<LandingPage/>}/>
          <Route path="/contact" element={<ContactPage/>}/>
          <Route path="/grad-shoot-booking" element={<BookGradShootPage/>}/>
          <Route path="/works" element={<WorksPage/>}/>
        </Routes>
      </div>
      
    </BrowserRouter>
    
  );
}

export default App;

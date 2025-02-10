import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import CurtiHeader from "./components/CurtiHeader.js";
import ContactPage from "./components/ContactPage.js";
import BookShootPage from "./components/BookShootPage.js";
import LandingPage from "./components/LandingPage.js";
import PhotographyPage from "./components/PhotographyPage.js";
import AboutPage from "./components/AboutPage.js";
import VideographyPage from "./components/VideographyPage.js";
import ChooseShootPage from "./components/ChooseShootPage.js";
// import Header from "./components/Header.js";
import PricingAndPoliciesPage from "./components/PricingAndPoliciesPage.js";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <div className="headerContainer">
          <CurtiHeader/>
        </div>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/book-grad-shoot" element={<BookShootPage />} />
          <Route path="/choose-shoot" element={<ChooseShootPage/>}/>
          <Route path="/photography" element={<PhotographyPage />} />
          <Route path="/videography" element={<VideographyPage />} />
          <Route path="/pricing-and-policies" element={<PricingAndPoliciesPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;

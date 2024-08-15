import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import ContactPage from "./components/ContactPage.js";
import BookShootPage from "./components/BookShootPage.js";
import LandingPage from "./components/LandingPage.js";
import WorksPage from "./components/WorksPage.js";
import Header from "./components/Header.js";
import PricingAndPoliciesPage from "./components/PricingAndPoliciesPage.js";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Header />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/book-a-shoot" element={<BookShootPage />} />
          <Route path="/works" element={<WorksPage />} />
          <Route path="/works" element={<WorksPage />} />
          <Route path="/pricing-and-policies" element={<PricingAndPoliciesPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;

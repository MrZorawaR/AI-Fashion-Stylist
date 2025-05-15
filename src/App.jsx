import { useState } from 'react';
import { ThemeProvider } from './components/theme-provider';
import { Toaster } from '@/components/ui/toaster';  
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import AnalysisPage from './pages/AnalysisPage';
import RecommendationsPage from './pages/RecommendationsPage';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import AboutUs from './pages/AboutUs';

function App() {
  const [bodyData, setBodyData] = useState(null);
  const [gender, setGender] = useState("");
  const [recommendations, setRecommendations] = useState(null);
  
  return (
    <ThemeProvider defaultTheme="light">
      <BrowserRouter>
        <div className="flex flex-col min-h-screen">
          <Navbar />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/about" element={<AboutUs />} />
              <Route 
                path="/analysis" 
                element={
                  <AnalysisPage 
                    setBodyData={setBodyData} 
                    setRecommendations={setRecommendations}
                    setGender={setGender}
                  />
                } 
              />
              <Route 
                path="/recommendations" 
                element={
                  <RecommendationsPage 
                    bodyData={bodyData} 
                    recommendations={recommendations}
                    gender={gender}
                  />
                } 
              />
            </Routes>
          </main>
          <Footer />
        </div>
      </BrowserRouter>
      {/* <Toaster /> */}
    </ThemeProvider>
  );
}

export default App;
import React, { useState } from 'react';
import './App.css';
import HomePage from './pages/HomePage';
import LibraryPage from './pages/LibraryPage';
import BaytElitePage from './projects/BaytElitePage';
import TawasulAIPage from './projects/TawasulAIPage';
import ZimamDeliveryPage from './projects/ZimamDeliveryPage';
import AlMultaqaPage from './projects/AlMultaqaPage';

function App() {
  const [currentPage, setCurrentPage] = useState('home');

  const renderPage = () => {
    switch (currentPage) {
      case 'bayt-elite': return <BaytElitePage onBack={() => setCurrentPage('home')} />;
      case 'tawasul-ai': return <TawasulAIPage onBack={() => setCurrentPage('home')} />;
      case 'zimam-delivery': return <ZimamDeliveryPage onBack={() => setCurrentPage('home')} />;
      case 'al-multaqa': return <AlMultaqaPage onBack={() => setCurrentPage('home')} />;
      case 'library': return <LibraryPage onBack={() => setCurrentPage('home')} />;
      default: return <HomePage onSelectProject={setCurrentPage} />;
    }
  };

  return (
    <div className="App">
      <div className="top-nav">
        <button className="back-btn" onClick={() => setCurrentPage('home')}>
          🏠 Home
        </button>
        <button className="library-btn" onClick={() => setCurrentPage('library')}>
          📚 Knowledge Library
        </button>
      </div>
      {renderPage()}
    </div>
  );
}

export default App;

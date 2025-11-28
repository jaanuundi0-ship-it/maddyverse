import { useState } from 'react';
import Home from './pages/Home';
import SunshineJournal from './pages/SunshineJournal';
import MadnessArcade from './pages/MadnessArcade';
import LifephileLogbook from './pages/LifephileLogbook';
import Poems from './pages/Poems';
import Paragraphs from './pages/Paragraphs';

function App() {
  const [currentPage, setCurrentPage] = useState<'home' | 'journal' | 'arcade' | 'logbook' | 'poems' | 'paras'>('home');

  const renderPage = () => {
    switch (currentPage) {
      case 'journal':
        return <SunshineJournal onBack={() => setCurrentPage('home')} />;
      case 'arcade':
        return <MadnessArcade onBack={() => setCurrentPage('home')} />;
      case 'logbook':
        return <LifephileLogbook onBack={() => setCurrentPage('home')} />;
      case 'poems':
        return <Poems onBack={() => setCurrentPage('home')} />;
      case 'paras':
        return <Paragraphs onBack={() => setCurrentPage('home')} />;
      default:
        return <Home onNavigate={setCurrentPage} />;
    }
  };

  return renderPage();
}

export default App;

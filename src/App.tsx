import { useState, useEffect } from 'react';
import { Heart, Sun, Gamepad2, BookOpen } from 'lucide-react';
import Home from './pages/Home';
import SunshineJournal from './pages/SunshineJournal';
import MadnessArcade from './pages/MadnessArcade';
import LifephileLogbook from './pages/LifephileLogbook';

function App() {
  const [currentPage, setCurrentPage] = useState<'home' | 'journal' | 'arcade' | 'logbook'>('home');

  const renderPage = () => {
    switch (currentPage) {
      case 'journal':
        return <SunshineJournal onBack={() => setCurrentPage('home')} />;
      case 'arcade':
        return <MadnessArcade onBack={() => setCurrentPage('home')} />;
      case 'logbook':
        return <LifephileLogbook onBack={() => setCurrentPage('home')} />;
      default:
        return <Home onNavigate={setCurrentPage} />;
    }
  };

  return renderPage();
}

export default App;
